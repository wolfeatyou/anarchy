import {IsDefined, IsString } from 'class-validator';

export class IOperationParameterMeta {
  @IsString()
  @IsDefined()
  code: string;

  @IsString()
  dataSourceCode: string;
  @IsString()
  dataItemProperty: string;

}
