import {IDataSourceMeta} from './DataSourceMeta';
import {validateSync, ValidationError} from 'class-validator';
import {plainToClass} from 'class-transformer';
import {IOperationMeta} from './OperationMeta';

export class MetaDataParser {

  static lastErrors: any;

  static getDataSource(meta: any): IDataSourceMeta {

    const obj: IDataSourceMeta = plainToClass(IDataSourceMeta, meta);
    if (obj) {
      MetaDataParser.validateInternal(obj);
    }
    return obj;
  }

  static getOperation(meta: any): IOperationMeta {
    const obj: IOperationMeta = plainToClass(IOperationMeta, meta);
    if (obj) {
      MetaDataParser.validateInternal(obj);
    }
    return obj;
  }

  static validateInternal(obj: any) {
    const errors = validateSync(obj, {whitelist: true, forbidNonWhitelisted: true});
    MetaDataParser.lastErrors = errors;
    if (errors.length > 0) {
      console.log('validation failed. errors: ', errors);
    } else {
      console.log('validation succeed');
    }
  }

}
