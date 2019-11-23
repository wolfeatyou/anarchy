import {IsArray, IsOptional, IsString, ValidateNested} from 'class-validator';
import {ILinkMeta} from './LinkMeta';
import {Type} from 'class-transformer';
import {IPanelPartMeta, IPartMeta} from './PartMeta';

export class IBarMeta extends IPanelPartMeta {
  @IsOptional()
  @IsString()
  code: string;

  @IsArray()
  @Type(() => IPartMeta, {
    discriminator: {
      property: 'type',
      subTypes: [
        {value: ILinkMeta, name: 'link'}
      ]
    },
    keepDiscriminatorProperty: true,
  })
  @ValidateNested()
  @IsOptional()
  items: IPartMeta[];
}
