import {MetaDataParser} from './MetaDataParser';
import {IBarMeta} from '../BarMeta';
import {IPlaceHolderMeta} from '../PlaceHolderMeta';
import {ILayoutMeta} from '../LayoutMeta';
import {AdministrationPackage} from '../samples/administration.package';


describe('Metadata parser tests', () => {

  it('check is basic validation works', () => {
    const obj = {
      code: 'ds1',
      someProperty: 0,
      operations: []
    };
    const parser = new MetaDataParser(false);
    parser.getDataSourceMeta(obj);
    expect(parser.lastErrors).not.toBeNull();
    expect(parser.lastErrors.length).toBe(1);
  });

  it('check is operation validation works', () => {
    const obj = {
      code: 'operation1',
      parameters: []
    };
    const parser = new MetaDataParser(false);
    parser.getOperationMeta(obj);
    expect(parser.lastErrors).not.toBeNull();
    expect(parser.lastErrors.length).toBe(0);
  });

  it('check is link validation works', () => {
    const obj = {
      code: 'link1'
    };
    const parser = new MetaDataParser(false);
    parser.getLinkMeta(obj);
    expect(parser.lastErrors).not.toBeNull();
    expect(parser.lastErrors.length).toBe(0);
  });


  it('check is nested validation works', () => {
    const obj = {
      code: 'ds1',
      operations: [{code: 'operation1', parameters: []}]
    };
    const parser = new MetaDataParser(false);
    parser.getDataSourceMeta(obj);
    expect(parser.lastErrors).not.toBeNull();
    expect(parser.lastErrors.length).toBe(0);
  });

  it('check is Panel parsed correctly', () => {
    const panel = {
      type: 'panel',
      code: 'panel1',
      parts: [
        {
          type: 'bar',
          code: 'bar',
          items: [{type: 'link', panel: 'some', target: 'ph1', isTab: true}]
        },
        {
          type: 'placeholder',
          code: 'ph1',
          layout: 'master'
        },
        {
          type: 'layout',
          template: 'master details'
        }
      ]
    };
    const parser = new MetaDataParser(false);
    const panelMeta = parser.getPanelMeta(panel);
    expect(parser.lastErrors).not.toBeNull();
    expect(parser.lastErrors.length).toBe(0);
    expect(panelMeta.parts.length).toBeGreaterThan(0);
    expect(panelMeta.parts[0] instanceof IBarMeta).toBeTruthy();
    expect(panelMeta.parts[1] instanceof IPlaceHolderMeta).toBeTruthy();
    expect(panelMeta.parts[2] instanceof ILayoutMeta).toBeTruthy();
  });

  it('check is officers and grants parsed', () => {
    const parser = new MetaDataParser(false);
    const packageMeta = parser.getPackageMeta(AdministrationPackage.package);
    expect(parser.lastErrors).not.toBeNull();
    expect(parser.lastErrors.length).toBe(0);
  });

});

