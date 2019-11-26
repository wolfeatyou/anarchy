import {action, computed, observable} from 'mobx';
import {IConditionMeta} from '../meta/ConditionMeta';
import {PanelState} from './panel.state';
import {DataSourceBuilder, DataSourceRelation} from './DataSourceState/datasource.builder';

export class ConditionState {

  public code: string;
  @observable private relations: DataSourceRelation[];
  @observable value: boolean;

  constructor(private metadata: IConditionMeta, private panel: PanelState) {
    this.code = metadata.code;
    this.parseConditionExpresion();
  }

  @computed get Value() {
    return this.value;
  }

  @action
  setValue(val) {
    this.value = val;
  }

  @action
  calculateValue() {
    let script = this.metadata.if;
    this.relations.forEach((r: DataSourceRelation) => {

      r.dataItemProperties.forEach((p: string) => {

        const placeholder = '{' + r.dataSourceId + '.' + p + '}';
        /*const dataSource = this.panel.appState.getDataSourceById(r.dataSourceId);
        let value = null;
        if (dataSource.selectedDataItem) {
          value = dataSource.selectedDataItem[p];
        }
        const re = new RegExp(`${placeholder}`, 'gi');
        script = script.replace(re, value);
*/
      });
    });
    const f = new Function('return ' + script);
    this.value = f();
    console.log(`action: Calculate condition ${this.code} for panel ${this.panel.metadata.code}: ` + script + ', value: ' + this.value);
  }
  @action
  setRelations(relations: DataSourceRelation[]) {
    this.relations = relations;
  }

  parseConditionExpresion() {
    const regexp = /{\w+\.\w+}/g;
    const matches = this.metadata.if.match(regexp);
    const placeholders = [...new Set(matches)];

    const relations = {};
    placeholders.forEach((placeholder: any) => {
      try {
        const propIndex = placeholder.indexOf('.');
        const dataSourceId = placeholder.substring(1, propIndex);
        const propertyCode = placeholder.substring(propIndex + 1, placeholder.length - 1);
        if (relations[dataSourceId] == null) {
          relations[dataSourceId] = new DataSourceRelation(dataSourceId, []);
        }
        if (relations[dataSourceId].dataItemProperties.indexOf(propertyCode) === -1) {
          relations[dataSourceId].dataItemProperties.push(propertyCode);
        }
        const relsArray: DataSourceRelation[] = Object.values(relations);
       /* DataSourceBuilder.initRelatedDataSourceReactions(relsArray, this.panel.appState, async () => {
          await this.calculateValue();
        }, `(condition ${this.code})`);
        this.setRelations(relsArray);*/
      } catch (e) {
        throw new Error('cant parse condition placeholder (expecting format {aaa.bbb} ): ' + this.metadata.if);
      }
    });

  }

}





