import {IsDefined, IsString, Length} from 'class-validator';

export class IConditionMeta {
  @Length(1, 2000)
  public code: string;
  @Length(1, 2000)
  public if: string;
}
