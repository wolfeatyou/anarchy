import {IsArray, IsDefined, IsOptional, IsString, Length, ValidateNested} from 'class-validator';
import {ILinkMeta} from './LinkMeta';
import {IFieldMeta} from './FieldMeta';
import {IConditionMeta} from './ConditionMeta';
import {IDataSourceMeta} from './DataSourceMeta';
import {Type} from 'class-transformer';
import {IOperationMeta} from './OperationMeta';
import {Optional} from '@angular/core';

export class IPanelMeta {
  @Length(1, 500)
  code: string;
  @IsArray()
  @Type(() => IFieldMeta)
  @ValidateNested()
  @IsOptional()
  fields: IFieldMeta[];
  @IsArray()
  @Type(() => ILinkMeta)
  @ValidateNested()
  @IsOptional()
  tabs: ILinkMeta[];
  @IsArray()
  @Type(() => ILinkMeta)
  @IsOptional()
  @ValidateNested()
  links: ILinkMeta[];
  @IsArray()
  @Type(() => IConditionMeta)
  @ValidateNested()
  @IsOptional()
  conditions: IConditionMeta[];
  listProperties: any;
  formProperties: any;
  @IsArray()
  @Type(() => IDataSourceMeta)
  @ValidateNested()
  @IsOptional()
  dataSources: IDataSourceMeta [];
}
