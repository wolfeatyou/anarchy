import {computed, observable, reaction, runInAction} from 'mobx';
import {DataSourceState} from './DataSourceState/datasource.state';
import {IPanelMeta} from '../meta/PanelMeta';
import {ConditionState} from './condition.state';
import {IHierarchyPart} from './hierarchyPart.interface';
import {PartState} from './part.state';
import {IPanelPartMeta} from '../meta/PartMeta';
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
    this.metadata.parts.forEach((partMeta: IPanelPartMeta) => {
      this.parts.push(new PartResolver().resolve(partMeta, this));
    });
  }

  GetConditions() {
    return this.conditions;
  }

  get metadata(): IPanelMeta {
    return this.meta as IPanelMeta;
  }
}






