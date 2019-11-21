import {IsBoolean, IsOptional, IsString} from 'class-validator';
import {IPanelPartMeta, IPartMeta} from './PartMeta';

export class IPlaceHolderMeta extends IPanelPartMeta {
  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  panel: string;
}
