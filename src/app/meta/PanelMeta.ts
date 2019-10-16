import {IsDefined, IsString} from 'class-validator';
import {ILinkMeta} from './LinkMeta';
import {IFieldMeta} from './FieldMeta';
import {IConditionMeta} from './ConditionMeta';
import {IDataSourceMeta} from './DataSourceMeta';

export class IPanelMeta {
  id: string;
  fields: IFieldMeta[];
  tabs: ILinkMeta[];
  links: ILinkMeta[];
  conditions: IConditionMeta[];
  listProperties: any;
  formProperties: any;
  dataSource: IDataSourceMeta;
}
