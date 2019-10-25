import {IDataSourceMeta} from '../DataSourceMeta';
import {validateSync} from 'class-validator';
import {plainToClass} from 'class-transformer';
import {IOperationMeta} from '../OperationMeta';
import {IPanelMeta} from '../PanelMeta';
import {IConditionMeta} from '../ConditionMeta';

export class MetaDataParser {

  static lastErrors: any;

  static getDataSourceMeta(meta: any): IDataSourceMeta {

    const obj: IDataSourceMeta = plainToClass(IDataSourceMeta, meta);
    if (obj) {
      MetaDataParser.validateInternal(obj);
    }
    return obj;
  }

  static getPanelMeta(meta: any): IPanelMeta {

    const obj: IPanelMeta = plainToClass(IPanelMeta, meta);
    if (obj) {
      MetaDataParser.validateInternal(obj);
    }
    return obj;
  }

  static getOperationMeta(meta: any): IOperationMeta {
    const obj: IOperationMeta = plainToClass(IOperationMeta, meta);
    if (obj) {
      MetaDataParser.validateInternal(obj);
    }
    return obj;
  }

  static geConditionMeta(meta: any): IConditionMeta {
    const obj: IConditionMeta = plainToClass(IConditionMeta, meta);
    if (obj) {
      MetaDataParser.validateInternal(obj);
    }
    return obj;
  }

  static validateInternal(obj: any, throwOnException: boolean = true) {
    const errors = validateSync(obj, {whitelist: true, forbidNonWhitelisted: true});
    MetaDataParser.lastErrors = errors;
    if (MetaDataParser.lastErrors.length > 0 && throwOnException) {
      console.dir(MetaDataParser.lastErrors);
      MetaDataParser.lastErrors = [];
      throw Error('Parser error');
    }

  }

}
