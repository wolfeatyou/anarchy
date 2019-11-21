import {IsArray, IsOptional, Length, ValidateNested} from 'class-validator';
import {ILinkMeta} from './LinkMeta';
import {IConditionMeta} from './ConditionMeta';
import {IDataSourceMeta} from './DataSourceMeta';
import {Type} from 'class-transformer';
import {IPanelPartMeta} from './PartMeta';
import {IBarMeta} from './BarMeta';
import {IOperationMeta} from './OperationMeta';
import {IPlaceHolderMeta} from './PlaceHolderMeta';
import {ILayoutMeta} from './LayoutMeta';

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
        {value: ILayoutMeta, name: 'layout'},
        {value: IPlaceHolderMeta, name: 'placeholder'},
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
}
