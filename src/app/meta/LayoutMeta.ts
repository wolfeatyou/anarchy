import {IPanelPartMeta} from './PartMeta';
import {IsOptional, IsString} from 'class-validator';

export class ILayoutMeta extends IPanelPartMeta {
  @IsString()
  @IsOptional()
  template: string;
}
