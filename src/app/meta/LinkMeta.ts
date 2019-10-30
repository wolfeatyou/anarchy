import {IsBoolean, IsDefined, IsOptional, IsString} from 'class-validator';
import {observable} from 'mobx';

export class ILinkMeta {
  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  panelId: string;

  @IsOptional()
  @IsBoolean()
  hidden: boolean;

  @IsOptional()
  @IsString()
  visibleCondition: string;

}
