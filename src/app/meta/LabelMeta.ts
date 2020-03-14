import {IsArray, IsBoolean, IsOptional, IsString} from 'class-validator';
import {IPanelPartMeta, IPartMeta} from './PartMeta';
import {IOperationParameterMeta} from "./OperationParameterMeta";

export class ILabelMeta extends IPanelPartMeta {

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  text: string;

  @IsArray()
  @IsOptional()
  parameters: IOperationParameterMeta[];


  @IsOptional()
  @IsString()
  align: string;

  @IsOptional()
  @IsString()
  hack: string;

}
