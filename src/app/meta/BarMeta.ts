import {IsArray, IsOptional, IsString, ValidateNested} from 'class-validator';
import {ILinkMeta} from './LinkMeta';
import {Type} from 'class-transformer';
import {IPanelPartMeta, IPartMeta} from './PartMeta';
import {ILabelMeta} from './LabelMeta';
import {ICustomMeta} from './CustomMeta';

export class IBarMeta extends IPanelPartMeta {
  @IsOptional()
  @IsString()
  code: string;

  @IsArray()
  @Type(() => IPartMeta, {
    discriminator: {
      property: 'type',
      subTypes: [
        {value: ILinkMeta, name: 'link'},
        {value: ILabelMeta, name: 'label'},
        {value: ICustomMeta, name: 'custom'}
      ]
    },
    keepDiscriminatorProperty: true,
  })
  @ValidateNested()
  @IsOptional()
  items: IPartMeta[];

  @IsOptional()
  height: number;

  @IsOptional()
  role: string;

  @IsOptional()
  boxDecorations: any;
}
