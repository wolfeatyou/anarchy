import {Injectable} from '@angular/core';
import {MetaDataParser} from '../meta/parser/MetaDataParser';


export class MetadataResolver {

  packages: any;

  constructor() {
    this.packages = {};
  }

  resolvePanel(packageCode: string, panelCode: string) {
    const pacMeta = this.packages[packageCode];
    if (!pacMeta) {
      throw new Error(`Package with code ${packageCode} not found`);
    }
    const panelMeta = pacMeta[panelCode];
    if (!panelMeta) {
      throw new Error(`Panel with code ${panelCode} not found`);
    }
    return new MetaDataParser().getPanelMeta(panelMeta);
  }

  addMetadataPackage(packageCode: string, meta: any ){
    this.packages[packageCode] = meta;
  }

}


