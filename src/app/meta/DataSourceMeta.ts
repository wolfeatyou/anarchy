import {IOperationMeta} from './OperationMeta';
import {IsArray, IsDefined, IsOptional, IsString, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {IPartMeta} from './PartMeta';

export class IDataSourceMeta extends IPartMeta {
  @IsString()
  @IsDefined()
  code: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsArray()
  @ValidateNested()
  @Type(() => IOperationMeta)
  operations: IOperationMeta [];

}


