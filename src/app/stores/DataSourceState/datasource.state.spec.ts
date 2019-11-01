import {configure, runInAction} from 'mobx';
import {async} from '@angular/core/testing';
import {OneLevelMaterDetailsTestData} from '../test/OneLevelMasterDetails.testdata';
import {TestUtils} from '../../utils/TestUtils';



describe('Data Source test', () => {

  beforeEach(async(() => {
    configure({enforceActions: 'always'});

  }));

  it('Check panel meta', async () => {
    const test = new OneLevelMaterDetailsTestData();
    expect(test.appState.getDataSourceById('ds1')).toBeDefined();
    expect(test.appState.getDataSourceById('ds2')).toBeDefined();
    expect(test.appState.getDataSourceById('dsRelated')).toBeDefined();

  });

  it('Check ds defined in appstate', async () => {
    const test = new OneLevelMaterDetailsTestData();
    expect(test.appState.getDataSourceById('ds1')).toBeDefined();
    expect(test.appState.getDataSourceById('ds2')).toBeDefined();
    expect(test.appState.getDataSourceById('dsRelated')).toBeDefined();

  });


  it('One Level DataSources test', async () => {

    const test = new OneLevelMaterDetailsTestData();


    await TestUtils.waitForRefresh(test.dataSourceRelated, 1);
    expect(test.dataSourceRelated.reloadCounter).toBe(1);


    await TestUtils.waitForRefresh(test.dataSourceRelated, 2);
    expect(test.dataSourceRelated.reloadCounter).toBe(2);


    test.dataSource1.setSelectedIndex(1);
    await TestUtils.waitForRefresh(test.dataSourceRelated, 3);
    expect(test.dataSourceRelated.reloadCounter).toBe(3);

    runInAction(() => {
      test.dataSource2.selectedDataItem.desc = 'new description';
    });
    await TestUtils.waitForRefresh(test.dataSourceRelated);
    expect(test.dataSourceRelated.reloadCounter).toBe(4);

    await new Promise((r) => setTimeout(r, 50));
    expect(test.dataSourceRelated.reloadCounter).toBe(4);
  });

});

