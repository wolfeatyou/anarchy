import {reaction, runInAction} from 'mobx';
import {IPanelPartMeta, IPartMeta} from '../meta/PartMeta';
import {IHierarchyPart} from './hierarchyPart.interface';
import {DataSourceState} from './DataSourceState/datasource.state';
import {PageState} from './page.state';

export class PartState implements IHierarchyPart {
  internalmeta: IPartMeta;
  parent: IHierarchyPart;
  Visible: boolean;

  constructor(metadata: IPartMeta, parent: IHierarchyPart) {
    runInAction(() => {
      this.internalmeta = metadata;
      this.parent = parent;
    });
  }

  getPartType() {
    return this.internalmeta.type;
  }


  GetConditions() {
    if (this.parent) {
      return this.parent.GetConditions();
    }
    return [];
  }

  GetDataSources(): DataSourceState[] {
    if (this.parent) {
      return this.parent.GetDataSources();
    }
    return [];
  }

  GetPage(): PageState {
    return this.parent.GetPage();
  }
}





