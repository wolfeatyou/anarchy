import {IsArray, IsDefined, IsOptional, IsString, ValidateNested} from 'class-validator';
import {ILinkMeta} from './LinkMeta';
import {Type} from 'class-transformer';
import {IPanelPartMeta, IPartMeta} from './PartMeta';
import {IPlaceHolderMeta} from './PlaceHolderMeta';

export class IMenuMeta extends IPanelPartMeta {
  @IsOptional()
  @IsString()
  code: string;

  @IsString()
  @IsDefined()
  @IsOptional()
  dataSourceCode: string;

  @IsArray()
  @Type(() => ILinkMeta)
  @ValidateNested()
  @IsOptional()
  items: ILinkMeta[];
}
