import {IsBoolean, IsOptional, IsString} from 'class-validator';
import {IPartMeta} from './PartMeta';
import {ILabelMeta} from './TextMeta';
import {Type} from 'class-transformer';

export class ILinkMeta extends IPartMeta {
  @IsOptional()
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  page: string;

  @IsOptional()
  @IsString()
  panel: string;

  @IsOptional()
  @IsString()
  target: string;

  @IsOptional()
  @IsBoolean()
  isTab: string;

  @IsOptional()
  @IsBoolean()
  hidden: boolean;

  @IsOptional()
  @IsString()
  visibleCondition: string;
}

