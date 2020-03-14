import {IsArray, IsOptional, Length, ValidateNested} from 'class-validator';
import {IConditionMeta} from './ConditionMeta';
import {IDataSourceMeta} from './DataSourceMeta';
import {Type} from 'class-transformer';
import {IPanelPartMeta} from './PartMeta';
import {IBarMeta} from './BarMeta';
import {IPlaceHolderMeta} from './PlaceHolderMeta';
import {ILayoutMeta} from './LayoutMeta';
import {IListMeta} from './ListMeta';
import {IMenuMeta} from './MenuMeta';
import {ILabelMeta} from './LabelMeta';
import {ILinkMeta} from './LinkMeta';
import {ICustomMeta} from './CustomMeta';

export class IPanelMeta extends IPanelPartMeta {
  @Length(1, 500)
  code: string;
  @Length(1, 500)
  @IsOptional()
  package: string;
  @IsArray()
  @Type(() => IPanelPartMeta, {
    discriminator: {
      property: 'type',
      subTypes: [
        {value: IBarMeta, name: 'bar'},
        {value: IPanelMeta, name: 'panel'},
        {value: IBarMeta, name: 'toolbar'},
        {value: ILabelMeta, name: 'label'},
        {value: ILinkMeta, name: 'link'},
        {value: ICustomMeta, name: 'custom'},
        {value: IBarMeta, name: 'header'},
        {value: IBarMeta, name: 'menu'},
        {value: ILayoutMeta, name: 'layout'},
        {value: IListMeta, name: 'list'},
        {value: IMenuMeta, name: 'menu'},
        {value: IPlaceHolderMeta, name: 'placeholder'}
      ]
    },
    keepDiscriminatorProperty: true,
  })
  @ValidateNested()
  @IsOptional()
  parts: IPanelPartMeta[];
  @IsArray()
  @Type(() => IConditionMeta)
  @ValidateNested()
  @IsOptional()
  conditions: IConditionMeta[];
  @IsArray()
  @Type(() => IDataSourceMeta)
  @ValidateNested()
  @IsOptional()
  dataSources: IDataSourceMeta [];

  @IsOptional()
  boxDecorations: any;
}
