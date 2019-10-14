import {IOperationMeta} from './OperationMeta';
import {IsArray, IsOptional, IsString, MaxLength} from 'class-validator';

export class IDataSourceMeta {
  @IsString()
  code: string;
  @IsOptional()
  operations: IOperationMeta [];
}
