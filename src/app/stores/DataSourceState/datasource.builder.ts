import {DataSourceOperationTypeEnum} from '../../meta/OperationMeta';
import {reaction} from 'mobx';
import {PageState} from '../page.state';

export class DataSourceBuilder {

  static getRelatedDataSources(metadata: any): DataSourceRelation[] {
    const result = [];
    if (metadata.operations == null) {
      return result;
    }
    const operations = metadata.operations.filter((o: any) => {
      return o.type === DataSourceOperationTypeEnum.read;
    });
    if (operations.length === 0) {
      return result;
    }
    if (operations.length > 1) {
      throw new Error('Read operation must be only one for DataSource ' + metadata.code);
    }
    const readOperation = operations[0];

    if (readOperation.parameters == null) {
      return result;
    }
    const m: any = {};
    readOperation.parameters.forEach((p: any) => {
      if (p.source && p.source.dataSourceId) {
        if (m[p.source.dataSourceId] == null) {
          m[p.source.dataSourceId] = new DataSourceRelation(p.source.dataSourceId, []);
        }
        m[p.source.dataSourceId].dataItemProperties.push(p.source.dataItemProperty);
      }
    });
    return Object.values(m) as DataSourceRelation[];
  }

  static initRelatedDataSourceReactions(relations: DataSourceRelation[],
                                        pageState: PageState, callback: RelatedDataSourceReactionCallbackType,
                                        relationDesc: string = '') {
    relations.forEach((r: DataSourceRelation) => {
      const ds = pageState.getDataSourceById(r.dataSourceId);
      r.selectedItemReaction = reaction(
        () => ds.selectedDataItem,
        async (selectedItem) => {
          console.log('reaction' + relationDesc + ': selected item changed related ds' +
            r.dataSourceId + ' value:' + JSON.stringify(selectedItem));
          r.propertyReactions.forEach((pr: any) => pr());
          r.propertyReactions = [];
          r.propertyReactions.push(reaction(
            () => r.dataItemProperties.map((p: any) => selectedItem[p]),
            async (propValue) => {
              console.log('reaction' + relationDesc + ': related property changed, ' +
                'related ds \' + r.dataSourceId + \' value:\' ' + propValue);
              await callback();
            },
            {name: `property changed`, fireImmediately: false}
          ));
          await callback();
        },
        {name: `selected item changed`}
      );

    });
  }

}

export declare type RelatedDataSourceReactionCallbackType = () => void;


export class DataSourceRelation {

  public selectedItemReaction: any;
  public propertyReactions: any[];

  constructor(public dataSourceId: string, public dataItemProperties: string[]) {
    this.propertyReactions = [];
  }
}
