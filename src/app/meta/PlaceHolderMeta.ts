import {IsBoolean, IsOptional, IsString} from 'class-validator';
import {IPanelPartMeta} from './PartMeta';

export class IPlaceHolderMeta extends IPanelPartMeta {
  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  panel: string;

  @IsOptional()
  @IsBoolean()
  applyToUrl: boolean;
}
