import {IOperationMeta} from './OperationMeta';
import {IsArray, IsDefined, IsOptional, IsString, MaxLength, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';

export class IDataSourceMeta {
  @IsString()
  @IsDefined()
  code: string;

  @IsArray()
  @ValidateNested()
  @Type(() => IOperationMeta)
  operations: IOperationMeta [];

  testFinDs(): any {
    return 5;
  }
}
