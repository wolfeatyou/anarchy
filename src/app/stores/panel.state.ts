import {computed, observable, reaction, runInAction} from 'mobx';
import {DataSourceState} from './DataSourceState/datasource.state';
import {IPanelMeta} from '../meta/PanelMeta';
import {ConditionState} from './condition.state';
import {IHierarchyPart} from './hierarchyPart.interface';
import {PartState} from './part.state';
import {IPanelPartMeta, IPartMeta} from '../meta/PartMeta';
import {PartResolver} from './part.resolver';


export class PanelState extends PartState implements IHierarchyPart {
  @observable title: string;
  dataSources: DataSourceState[];
  conditions: ConditionState[];
  parts: PartState[];

  constructor(metadata: IPanelMeta, parent: IHierarchyPart) {
    super(metadata, parent);
    this.dataSources = [];
    this.parts = [];
    this.init();
  }

  @computed get Visible(): boolean {
    return this.parent.Visible;
  }

  init() {
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
    const allDataSources = this.parent.GetDataSources();
    allDataSources.addRange(this.dataSources);
    return allDataSources;
  }

  get metadata(): IPanelMeta {
    return this.internalmeta as IPanelMeta;
  }
}






