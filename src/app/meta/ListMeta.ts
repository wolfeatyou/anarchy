import {IsArray, IsDefined, IsOptional, IsString, ValidateNested} from 'class-validator';
import {ILinkMeta} from './LinkMeta';
import {Type} from 'class-transformer';
import {IPanelPartMeta, IPartMeta} from './PartMeta';

export class IListMeta extends IPanelPartMeta {
  @IsOptional()
  @IsString()
  code: string;

  @IsString()
  @IsDefined()
  @IsOptional()
  dataSourceCode: string;
}
