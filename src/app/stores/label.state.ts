import {action, computed, observable, reaction, runInAction} from 'mobx';
import {ILinkMeta} from '../meta/LinkMeta';
import {PanelState} from './panel.state';
import {ConditionState} from './condition.state';
import {IHierarchyPart} from './hierarchyPart.interface';
import {PartState} from './part.state';
import {IPartMeta} from '../meta/PartMeta';
import {ILabelMeta} from '../meta/LabelMeta';
import {DataSourceBuilder, DataSourceRelation} from './DataSourceState/datasource.builder';
import {IDataSourceMeta} from "../meta/DataSourceMeta";
import {DataSourceState} from "./DataSourceState/datasource.state";
import {IOperationParameterMeta} from "../meta/OperationParameterMeta";


export class LabelState extends PartState {

  relations: DataSourceRelation[];
  @observable
  parameters: any;

  constructor(metadata: ILabelMeta, parent: IHierarchyPart) {
    super(metadata, parent);

    if (metadata.parameters) {
      const relations = DataSourceBuilder.getRelatedDataSourcesForLabel(metadata.parameters);
      DataSourceBuilder.initRelatedDataSourceReactions(relations, this.parent.GetPanel(), async () => {
        this.calculateParameters();
      });
      this.relations = relations;
    }
  }

  @action
  calculateParameters() {
    this.parameters = {};
    this.metadata.parameters.forEach((p: IOperationParameterMeta) => {
      const ds = this.parent.GetPanel().getDataSourceById(p.dataSourceCode);
      if (ds.selectedDataItem) {
        this.parameters[p.code] = ds.selectedDataItem[p.dataItemProperty];
      } else {
        this.parameters[p.code] = '';
      }
    });
  }


  @computed
  get text(): string {

    if (this.parameters) {
      const parameters = this.parameters;
      //todo: use proper library
      const ttt = eval('`' + this.metadata.text + '`');
      return ttt;
    }
    return this.metadata.text;
  }

  get metadata(): ILabelMeta {
    return this.internalmeta as ILabelMeta;
  }

}





