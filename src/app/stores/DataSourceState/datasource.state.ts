import {action, computed, observable, reaction, runInAction} from 'mobx';
import {DataSourceBuilder, DataSourceRelation} from './datasource.builder';
import {IDataSourceMeta} from '../../meta/DataSourceMeta';
import {PanelState} from '../panel.state';
import {PageState} from '../page.state';
import {PartState} from '../part.state';
import {IHierarchyPart} from '../hierarchyPart.interface';


export class DataSourceState extends PartState {
  public code: string;
  @observable reloadCounter: number;
  private metadata: IDataSourceMeta;
  @observable data: any[];
  @observable selectedDataItem: any;
  @observable status: DataSourceStatus;
  relations: DataSourceRelation[];

  constructor(metadata: IDataSourceMeta, private panel: PanelState) {
    super(metadata, panel);
    runInAction(() => {
      this.code = metadata.code;
      this.reloadCounter = 0;
      console.log(`ds '${metadata.code}' set metadata`);
      this.metadata = metadata;
      this.status = DataSourceStatus.MustRefresh;
      this.data = [];
      const relations = DataSourceBuilder.getRelatedDataSources(metadata);
      DataSourceBuilder.initRelatedDataSourceReactions(relations, panel, async () => {
        await this.reload();
      }, `(dataSource ${this.code})`);
      console.log(`ds '${metadata.code}' set relations`);
      this.relations = relations;
    });

    reaction(() => this.Visible, async (visibility: boolean) => {
      console.log(`ds '${metadata.code}' is visible: ` + visibility);
      if (visibility) {
        this.status = DataSourceStatus.MustRefresh;
        const notReloadedDs = this.relations.find((r: DataSourceRelation) => {
          const ds = panel.getDataSourceById(r.dataSourceId);
          return ds.status === DataSourceStatus.MustRefresh;
        });
        if (notReloadedDs == null) {
          await this.reload();
        }
      }
    }, {fireImmediately: true});
  }

  @action
  setStatus(s: DataSourceStatus) {
    this.status = s;
  }



  @action
  setSelectedIndex(index: number) {
    if (index >= 0 && this.data && this.data.length > 0) {
      this.selectedDataItem = this.data[index];
      const page = this.GetPage();
      page.applicationState.routeState.queryUrlChanged(this.code, this.selectedDataItem.id);
    } else {
      this.selectedDataItem = null;
    }
  }

  @action
  setSelectedItem(item: any) {
    this.setSelectedIndex(this.data.indexOf(item));
  }

  @action
  reloadAsync() {
    let relStr = '';
    this.relations.forEach((current: DataSourceRelation) => {
      const dataItem = this.panel.getDataSourceById(current.dataSourceId).selectedDataItem;
      if (dataItem) {
        relStr = relStr + dataItem.id;
      }
    });
    return new Promise((resolve) => {
      setTimeout(() => {
        const d: any [] = [];
        for (let i = 0; i < 50; i++) {
          d.push({title: this.code + '_' + i + '---' + relStr, desc: 'some data', id: i});
        }
        resolve(d);
      }, 1);
    });

  }

  @action
  setCurrentSelection(items) {
    let selectedItem = null;
    if (items.length > 0) {
      const page = this.GetPage();
      const currentValue = page.applicationState.routeState.getQueryDataSourceValue(this.code);
      if (currentValue) {
        selectedItem = items.find((item: any) => {
          // tslint:disable-next-line:triple-equals
          return item.id == currentValue;
        });
      }
      if (!selectedItem) {
        selectedItem = items[0];
      }
    }
    this.setSelectedItem(selectedItem);
  }


  @action.bound
  async reload() {
    runInAction(() => {
      console.log('set must refresh for ' + this.code);
      this.status = DataSourceStatus.MustRefresh;
    });
    if (this.Visible) {
      const d = await this.reloadAsync();
      runInAction(() => {
        this.data = d as any[];
        this.setCurrentSelection(this.data);
        this.reloadCounter++;
        this.status = DataSourceStatus.Loaded;
        console.log('action async: data reloaded for ' + this.code + ', count:' + this.reloadCounter);
      });
    }
  }

  @computed get Visible() {
    return this.panel ? this.panel.Visible : true;
  }

}


export enum DataSourceStatus {
  MustRefresh,
  Loaded
}



