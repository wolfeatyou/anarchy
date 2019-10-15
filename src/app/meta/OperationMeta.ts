import {IsArray, IsDefined, IsString, Length, ValidateNested} from 'class-validator';
import {IOperationParameterMeta} from './OperationParameterMeta';

export class IOperationMeta {
  @IsString()
  @IsDefined()
  @Length(1, 500)
  code: string;

  @IsArray()
  parameters: IOperationParameterMeta[];

  testFinc(): any {
    return 5;
  }

}
