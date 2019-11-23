import {IsArray, IsOptional, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IPanelMeta} from './PanelMeta';
import {IPageMeta} from './PageMeta';

export class IPackageMeta {
  @IsArray()
  @Type(() => IPanelMeta)
  @ValidateNested()
  @IsOptional()
  panels: IPanelMeta[];

  @IsArray()
  @Type(() => IPageMeta)
  @ValidateNested()
  @IsOptional()
  pages: IPageMeta[];

}
