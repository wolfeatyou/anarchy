import {IsDefined, IsString} from 'class-validator';
import {observable} from 'mobx';

export class ILinkMeta {
  title: string;
  panelId: string;
  visible: boolean;
  visibleCondition: string;
}
