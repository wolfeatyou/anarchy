import {observable, computed, action, autorun, toJS, runInAction, reaction} from 'mobx';
import {IConditionMeta} from '../meta/ConditionMeta';
import {PanelState} from './panel.state';
import {DataSourceRelation} from './DataSourceState/datasource.builder';

export class ConditionState {

  code: string;
  @observable private relations: DataSourceRelation[];
  @observable value: boolean;

  constructor(private metadata: IConditionMeta, private panel: PanelState) {
    this.code = metadata.code;
    this.parseConditionExpresion();
  }

  @computed
  getValue() {
    return this.value;
  }

  @action
  setValue(val) {
    this.value = val;
  }

  @action
  setRelations(relations: DataSourceRelation[]) {
    this.relations = relations;
  }

  parseConditionExpresion() {
    const regexp = /\{\w+\.\w+\}/g;
    const matches = this.metadata.if.match(regexp);
    const placeholders = [...new Set(matches)];

    const relations = [];
    placeholders.forEach((placeholder: any) => {
      try {
        const propIndex = placeholder.indexOf('.');
        const dataSourceId = placeholder.substring(1, propIndex);
        const propertyCode = placeholder.substring(propIndex + 1, placeholder.length - 1);
        console.log(dataSourceId + ' - ' + propertyCode);
        if (relations[dataSourceId] == null) {
          relations[dataSourceId] = new DataSourceRelation(dataSourceId, []);
        }
        if (relations[dataSourceId].dataItemProperties.indexOf(propertyCode) === -1) {
          relations[dataSourceId].dataItemProperties.push(propertyCode);
        }
        this.setRelations(Object.values(relations));
      } catch (e) {
        throw new Error('cant parse condition placeholder (expecting format {aaa.bbb} ): ' + this.metadata.if);
      }
    });

  }

}





