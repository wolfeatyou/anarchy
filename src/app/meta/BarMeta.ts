import {IsArray, IsDefined, IsOptional, IsString, Length, ValidateNested} from 'class-validator';
import {ILinkMeta} from './LinkMeta';
import {IFieldMeta} from './FieldMeta';
import {IConditionMeta} from './ConditionMeta';
import {IDataSourceMeta} from './DataSourceMeta';
import {Type} from 'class-transformer';
import {IOperationMeta} from './OperationMeta';
import {Optional} from '@angular/core';
import {IPanelPartMeta, IPartMeta} from './PartMeta';
import {ILayoutMeta} from './LayoutMeta';
import {IPlaceHolderMeta} from './PlaceHolderMeta';

export class IBarMeta extends IPanelPartMeta {
  @IsOptional()
  @IsString()
  code: string;

  @IsArray()
  @Type(() => IPartMeta, {
    discriminator: {
      property: 'type',
      subTypes: [
        {value: ILinkMeta, name: 'link'}
      ]
    },
    keepDiscriminatorProperty: true,
  })
  @ValidateNested()
  @IsOptional()
  items: IPartMeta[];
}
