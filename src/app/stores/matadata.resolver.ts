import {MetaDataParser} from '../meta/parser/MetaDataParser';
import {IPackageMeta} from '../meta/PackageMeta';


export class MetadataResolver {

  packages: any;

  constructor() {
    this.packages = {};
  }

  resolvePanel(packageCode: string, panelCode: string) {
    const pacMeta = this.getPackage(packageCode);
    const panelMeta = pacMeta.panels[panelCode];
    if (!panelMeta) {
      throw new Error(`Panel with code ${panelCode} not found`);
    }
    return new MetaDataParser().getPanelMeta(panelMeta);
  }

  resolvePage(packageCode: string, pageCode: string) {
    const packageMeta = this.getPackage(packageCode);
    const pageMeta = packageMeta.pages.find(p => p.code === pageCode);
    if (!pageMeta) {
      throw new Error(`Page with code ${pageCode} not found`);
    }
    return new MetaDataParser().getPanelMeta(pageMeta);
  }

  getPackage(packageCode: string): IPackageMeta {
    const pacMeta = this.packages[packageCode];
    if (!pacMeta) {
      throw new Error(`Package with code ${packageCode} not found`);
    }
    return pacMeta;
  }

  addMetadataPackage(packageCode: string, meta: any) {
    Object.keys(meta).forEach(key => meta[key].package = packageCode);
    this.packages[packageCode] = meta;

  }

}


