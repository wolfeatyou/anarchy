import {IsArray, IsDefined, IsOptional, IsString, Length, ValidateNested} from 'class-validator';
import {ILinkMeta} from './LinkMeta';
import {IFieldMeta} from './FieldMeta';
import {IConditionMeta} from './ConditionMeta';
import {IDataSourceMeta} from './DataSourceMeta';
import {Type} from 'class-transformer';
import {IOperationMeta} from './OperationMeta';
import {Optional} from '@angular/core';

export abstract class IPartMeta {
  @IsOptional()
  @Length(1, 500)
  type: string;

}
export abstract class IPanelPartMeta extends IPartMeta {
  @IsOptional()
  @IsString()
  layout: string;
}
