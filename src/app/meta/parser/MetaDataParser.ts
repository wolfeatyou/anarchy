import {IDataSourceMeta} from '../DataSourceMeta';
import {validateSync} from 'class-validator';
import {plainToClass} from 'class-transformer';
import {IOperationMeta} from '../OperationMeta';
import {IPanelMeta} from '../PanelMeta';
import {IConditionMeta} from '../ConditionMeta';
import {ILinkMeta} from '../LinkMeta';

export class MetaDataParser {

  constructor(private throwOnValidateException: boolean = true) {
  }

  public lastErrors: any;


  getDataSourceMeta(meta: any): IDataSourceMeta {

    const obj: IDataSourceMeta = plainToClass(IDataSourceMeta, meta);
    if (obj) {
      this.validateInternal(obj);
    }
    return obj;
  }

  getPanelMeta(meta: any): IPanelMeta {

    const obj: IPanelMeta = plainToClass(IPanelMeta, meta);
    if (obj) {
      this.validateInternal(obj);
    }
    return obj;
  }

  getOperationMeta(meta: any): IOperationMeta {
    const obj: IOperationMeta = plainToClass(IOperationMeta, meta);
    if (obj) {
      this.validateInternal(obj);
    }
    return obj;
  }

  getLinkMeta(meta: any): ILinkMeta {
    const obj: ILinkMeta = plainToClass(ILinkMeta, meta);
    if (obj) {
      this.validateInternal(obj);
    }
    return obj;
  }

  geConditionMeta(meta: any): IConditionMeta {
    const obj: IConditionMeta = plainToClass(IConditionMeta, meta);
    if (obj) {
      this.validateInternal(obj);
    }
    return obj;
  }

  validateInternal(obj: any) {
    const errors = validateSync(obj, {whitelist: true, forbidNonWhitelisted: true});
    this.lastErrors = errors;
    if (this.lastErrors.length > 0 && this.throwOnValidateException) {
      console.dir(this.lastErrors);
      this.lastErrors = [];
      throw Error('Parser error');
    }

  }

}
