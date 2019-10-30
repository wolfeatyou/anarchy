import {MetaDataParser} from './MetaDataParser';


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

});

