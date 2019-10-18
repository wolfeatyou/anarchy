import {IsArray, IsDefined, IsString, Length, ValidateNested} from 'class-validator';
import {ILinkMeta} from './LinkMeta';
import {IFieldMeta} from './FieldMeta';
import {IConditionMeta} from './ConditionMeta';
import {IDataSourceMeta} from './DataSourceMeta';
import {Type} from 'class-transformer';
import {IOperationMeta} from './OperationMeta';

export class IPanelMeta {
  @Length(1, 500)
  id: string;
  @IsArray()
  @Type(() => IFieldMeta)
  @ValidateNested()
  fields: IFieldMeta[];
  @IsArray()
  @Type(() => ILinkMeta)
  @ValidateNested()
  tabs: ILinkMeta[];
  @IsArray()
  @Type(() => ILinkMeta)
  links: ILinkMeta[];
  @IsArray()
  @Type(() => IConditionMeta)
  @ValidateNested()
  conditions: IConditionMeta[];
  listProperties: any;
  formProperties: any;
  @IsArray()
  @Type(() => IDataSourceMeta)
  @ValidateNested()
  dataSources: IDataSourceMeta [];
}
