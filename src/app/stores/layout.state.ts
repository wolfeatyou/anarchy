import {PartState} from './part.state';
import {IPanelPartMeta, IPartMeta} from '../meta/PartMeta';
import {IHierarchyPart} from './hierarchyPart.interface';
import {computed} from 'mobx';
import {PartResolver} from './part.resolver';
import {IBarMeta} from '../meta/BarMeta';
import {ILinkMeta} from '../meta/LinkMeta';
import {ILayoutMeta} from '../meta/LayoutMeta';
import {PlaceholderState} from './placeholder.state';
import {InPlaceFileWriter} from '@angular/compiler-cli/ngcc/src/writing/in_place_file_writer';
import {IPlaceHolderMeta} from '../meta/PlaceHolderMeta';
import {PageState} from './page.state';
import {PanelState} from "./panel.state";
import {DataSourceState} from './DataSourceState/datasource.state';

export class LayoutState extends PartState{

  constructor(metadata: ILayoutMeta, parent: IHierarchyPart) {
    super(metadata, parent);
    this.init();
  }

  placeholders: PlaceholderState[];
  items: PartState[];


  init() {
    this.placeholders = [];
    if(this.metadata.placeholders) {
      this.metadata.placeholders.forEach((p: IPlaceHolderMeta) => {
        this.placeholders.push(new PlaceholderState(p, this));
      });
    }
    this.items = [];
    if(this.metadata.items) {
      this.metadata.items.forEach((p: IPartMeta) => {
        this.items.push(new PartResolver().resolve(p, this));
      });
    }
  }

  get metadata(): ILayoutMeta {
    return this.internalmeta as ILayoutMeta;
  }

  @computed get Visible(): boolean {
    return this.parent.Visible;
  }

  GetConditions() {
    return this.parent.GetConditions();
  }
  GetDataSources() {
    return this.parent.GetDataSources();
  }

  GetPage(): PageState {
    return this.parent.GetPage();
  }

  GetPanel(): PanelState {
    return this.parent.GetPanel();
  }

  getDataSourceById(id: string): DataSourceState {
    const ds = this.GetDataSources().find((d: DataSourceState) => d.code === id);
    if (!ds) {
      throw new Error('Datasource not found ' + id);
    }
    return ds;
  }
}
