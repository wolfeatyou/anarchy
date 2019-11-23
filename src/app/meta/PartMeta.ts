import {IsOptional, IsString, Length} from 'class-validator';

export abstract class IPartMeta {
  @IsOptional()
  @Length(1, 500)
  type: string;

}
export abstract class IPanelPartMeta extends IPartMeta {
  @IsOptional()
  @IsString()
  layout: string;
}
