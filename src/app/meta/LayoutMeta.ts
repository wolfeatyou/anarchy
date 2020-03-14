import {IPanelPartMeta, IPartMeta} from './PartMeta';
import {IsArray, IsOptional, IsString, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IConditionMeta} from './ConditionMeta';
import {IPlaceHolderMeta} from './PlaceHolderMeta';

export class ILayoutMeta extends IPanelPartMeta {
  @IsString()
  @IsOptional()
  template: string;

  @IsArray()
  @Type(() => IPlaceHolderMeta)
  @ValidateNested()
  @IsOptional()
  placeholders: IPlaceHolderMeta[];

  @IsOptional()
  items: IPartMeta[];
}
