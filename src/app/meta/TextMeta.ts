import {IsBoolean, IsOptional, IsString} from 'class-validator';
import {IPartMeta} from './PartMeta';

export class ITextMeta extends IPartMeta {

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  text: string;

}
