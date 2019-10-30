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
  linkedPanelCode: string;

  @IsOptional()
  @IsString()
  linkedPanelPackageCode: string;

  @IsOptional()
  @IsBoolean()
  hidden: boolean;

  @IsOptional()
  @IsString()
  visibleCondition: string;

}
