import {observable, computed, action, autorun, toJS, runInAction, reaction} from 'mobx';
import {Injectable} from '@angular/core';
import {DataSourceState} from './DataSourceState/datasource.state';
import {IPanelMeta} from '../meta/PanelMeta';
import {calculateSizes} from '@angular-devkit/build-angular/src/angular-cli-files/utilities/bundle-calculator';
import {ILinkMeta} from '../meta/LinkMeta';
import {PanelState} from './panel.state';
import {ConditionState} from './condition.state';
import {MetadataResolver} from './matadata.resolver';
import {IPanelPartMeta} from '../meta/PartMeta';
import {ApplicationState} from './application.state';

export class PageState {

  constructor(private  appState: ApplicationState) {

  }


}





