import {IsDefined, IsString, Length} from 'class-validator';

export class IConditionMeta {
  code: string;
  @Length(1, 2000)
  if: string;
}
