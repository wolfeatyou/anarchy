import {IsDefined, IsString, Length} from 'class-validator';

export class IConditionMeta {
  public code: string;
  @Length(1, 2000)
  public if: string;
}
