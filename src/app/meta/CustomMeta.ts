import {IsArray, IsDefined, IsOptional, IsString, ValidateNested} from 'class-validator';
import {ILinkMeta} from './LinkMeta';
import {Type} from 'class-transformer';
import {IPanelPartMeta, IPartMeta} from './PartMeta';
import {IOperationParameterMeta} from './OperationParameterMeta';

export class ICustomMeta extends IPanelPartMeta {
  @IsOptional()
  @IsString()
  code: string;

  @IsString()
  @IsDefined()
  @IsOptional()
  dataSourceCode: string;

  @IsArray()
  @IsOptional()
  parameters: IOperationParameterMeta[];


  @IsOptional()
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  componentCode: string;

  @IsOptional()
  height: number;

}
