import {IsBoolean, IsOptional, IsString} from 'class-validator';
import {IPanelPartMeta, IPartMeta} from './PartMeta';


export class ILinkMeta extends IPanelPartMeta {
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

  @IsOptional()
  @IsString()
  align: string;
}

