import {IOperationMeta} from './OperationMeta';
import {IsArray, IsDefined, IsString, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';

export class IDataSourceMeta {
  @IsString()
  @IsDefined()
  code: string;

  @IsArray()
  @ValidateNested()
  @Type(() => IOperationMeta)
  operations: IOperationMeta [];

}


