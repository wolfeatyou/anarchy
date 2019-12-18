import {IsDefined, IsOptional, IsString} from 'class-validator';

export class IOperationParameterMeta {
  @IsString()
  @IsDefined()
  code: string;

  @IsOptional()
  @IsString()
  expression: string;

  @IsString()
  dataSourceCode: string;
  @IsString()
  dataItemProperty: string;

}
