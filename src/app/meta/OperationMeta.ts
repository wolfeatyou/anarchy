import {IsArray, IsDefined, IsString, Length} from 'class-validator';
import {IOperationParameterMeta} from './OperationParameterMeta';

export class IOperationMeta {
  @IsString()
  @IsDefined()
  @Length(1, 500)
  code: string;
  type: DataSourceOperationTypeEnum;
  @IsArray()
  parameters: IOperationParameterMeta[];


}

export enum DataSourceOperationTypeEnum {
  read = 'read',
  update = 'update',
  onchange = 'onchange',
  action = 'action'
}
