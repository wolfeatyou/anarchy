import {IOperationMeta} from './OperationMeta';
import {IsArray, IsDefined, IsOptional, IsString, MaxLength, ValidateNested} from 'class-validator';

export class IDataSourceMeta {
  @IsString()
  @IsDefined()
  code: string;

  @IsArray()
  @ValidateNested()
  operations: IOperationMeta [];
}
