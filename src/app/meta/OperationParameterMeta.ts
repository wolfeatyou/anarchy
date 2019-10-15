import {IOperationMeta} from './OperationMeta';
import {IsArray, IsDefined, IsOptional, IsString, MaxLength} from 'class-validator';

export class IOperationParameterMeta {
  @IsString()
  @IsDefined()
  code: string;
}
