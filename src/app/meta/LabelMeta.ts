import {IsArray, IsBoolean, IsOptional, IsString} from 'class-validator';
import {IPartMeta} from './PartMeta';
import {IOperationParameterMeta} from "./OperationParameterMeta";

export class ILabelMeta extends IPartMeta {

  @IsOptional()
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  text: string;

  @IsArray()
  @IsOptional()
  parameters: IOperationParameterMeta[];

}
