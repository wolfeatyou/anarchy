import {IPanelPartMeta, IPartMeta} from './PartMeta';
import {IsOptional, IsString} from 'class-validator';
import {isString} from 'util';

export class ILayoutMeta extends IPanelPartMeta {
  @IsString()
  @IsOptional()
  template: string;
}
