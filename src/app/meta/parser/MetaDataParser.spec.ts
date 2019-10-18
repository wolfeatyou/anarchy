import {MetaDataParser} from './MetaDataParser';


describe('Metadata parser tests', () => {

  it('check is basic validation works', () => {
    const obj = {
      code: 'ds1',
      someProperty: 0,
      operations: []
    };
    MetaDataParser.getDataSourceMeta(obj);
    expect(MetaDataParser.lastErrors).not.toBeNull();
    expect(MetaDataParser.lastErrors.length).toBe(1);
  });

  it('check is operation validation works', () => {
    const obj = {
      code: 'operation1',
      parameters: []
    };
    MetaDataParser.getOperationMeta(obj);
    expect(MetaDataParser.lastErrors).not.toBeNull();
    expect(MetaDataParser.lastErrors.length).toBe(0);
  });


  it('check is nested validation works', () => {
    const obj = {
      code: 'ds1',
      operations: [{code: 'operation1', parameters: []}]
    };
    MetaDataParser.getDataSourceMeta(obj);
    expect(MetaDataParser.lastErrors).not.toBeNull();
    expect(MetaDataParser.lastErrors.length).toBe(0);
  });

});

