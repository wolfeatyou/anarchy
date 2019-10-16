import {DataSourceOperationTypeEnum} from '../../meta/OperationMeta';

export class DataSourceBuilder {

  static getRelatedDataSources(metadata: any): any {
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

    return Object.values(m);
  }

}

export class DataSourceRelation {

  public selectedItemReaction: any;
  public propertyReactions: any[];

  constructor(public dataSourceId: string, public dataItemProperties: string[]) {
    this.propertyReactions = [];
  }
}
