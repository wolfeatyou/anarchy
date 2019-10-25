import {IsArray, IsDefined, IsEnum, IsOptional, IsString, Length} from 'class-validator';
import {IOperationParameterMeta} from './OperationParameterMeta';


export enum DataSourceOperationTypeEnum {
  read = 'read',
  update = 'update',
  onchange = 'onchange',
  action = 'action'
}

export class IOperationMeta {
  @IsString()
  @IsDefined()
  @Length(1, 500)
  code: string;

  @IsEnum(DataSourceOperationTypeEnum)
  type: DataSourceOperationTypeEnum;
  @IsArray()
  @IsOptional()
  parameters: IOperationParameterMeta[];


}
