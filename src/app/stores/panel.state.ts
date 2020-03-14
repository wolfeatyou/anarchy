import {action, computed, observable, reaction, runInAction} from 'mobx';
import {DataSourceState} from './DataSourceState/datasource.state';
import {IPanelMeta} from '../meta/PanelMeta';
import {ConditionState} from './condition.state';
import {IHierarchyPart} from './hierarchyPart.interface';
import {PartState} from './part.state';
import {IPanelPartMeta, IPartMeta} from '../meta/PartMeta';
import {PartResolver} from './part.resolver';
import {IDataSourceMeta} from '../meta/DataSourceMeta';
import {PageState} from './page.state';


export class PanelState extends PartState {
  @observable title: string;
  dataSources: DataSourceState[];
  conditions: ConditionState[];
  parts: PartState[];
  @observable modalPanel: PanelState;

  constructor(metadata: IPanelMeta, parent: IHierarchyPart) {
    super(metadata, parent);
    this.dataSources = [];
    this.parts = [];
    this.init();
  }

  @action
  setModalPanel(panel: PanelState) {
    this.modalPanel = panel;
  }

  @action
  closeModalPanel() {
    this.modalPanel = null;
  }


  @computed get Visible(): boolean {
    return this.parent.Visible;
  }

  init() {
    if (this.metadata.dataSources) {
      this.metadata.dataSources.forEach((dsMeta: IDataSourceMeta) => {
        this.dataSources.push(new DataSourceState(dsMeta, this));
      });
    }
    if (this.metadata.parts) {
      this.metadata.parts.forEach((partMeta: IPanelPartMeta) => {
        this.parts.push(new PartResolver().resolve(partMeta, this));
      });
    }

  }

  GetConditions() {
    return this.conditions;
  }

  GetDataSources() {
    let allDataSources: DataSourceState[] = [];
    if (this.parent) {
      allDataSources = this.parent.GetDataSources().filter((globalDs: DataSourceState) => {
        return this.dataSources.find((localDs: DataSourceState) => localDs.code === globalDs.code) == null;
      });
    }
    return allDataSources.concat(this.dataSources);
  }

  get metadata(): IPanelMeta {
    return this.internalmeta as IPanelMeta;
  }

  getDataSourceById(id: string): DataSourceState {
    const ds = this.GetDataSources().find((d: DataSourceState) => d.code === id);
    if (!ds) {
      throw new Error('Datasource not found ' + id);
    }
    return ds;
  }

  GetPage(): PageState {
    return this.parent.GetPage();
  }


  GetPanel(): PanelState {
    return this;
  }

  getStyles() {
    var styles = {}
    if(this.metadata.boxDecorations){
      if(this.metadata.boxDecorations.align){
        styles["align-items"] = this.metadata.boxDecorations.align;
      }
      if(this.metadata.boxDecorations.paddingTop){
        styles["padding-top"] = this.metadata.boxDecorations.paddingTop;
      }
      if(this.metadata.boxDecorations.borderWidth){
        styles["border-width"] = this.metadata.boxDecorations.borderWidth;
      }
      if(this.metadata.boxDecorations.borderWidth){
        styles["min-width"] = this.metadata.boxDecorations.width;
      }
    }
    return styles;
  }
}






