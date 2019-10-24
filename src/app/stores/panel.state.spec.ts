import {autorun, configure, runInAction, when} from 'mobx';
import {async} from '@angular/core/testing';
import {OneLevelMaterDetailsTestData} from './test/OneLevelMasterDetails.testdata';
import {TestUtils} from '../utils/TestUtils';
import {OneLevelMaterDetailsTestDataPanel} from './test/OneLevelMasterDetailsPanel.testdata';
import {DataSourceStatus} from './DataSourceState/datasource.state';
import {TwoLevelMaterDetailsTestDataPanel} from './test/TwoLevelMasterDetails.testdata';


describe('Panel tests', () => {

  beforeEach(async(() => {
    configure({enforceActions: 'always'});

  }));

  it('Check panel constructed', async () => {
    const test = new OneLevelMaterDetailsTestDataPanel();
    expect(test.panel1).toBeDefined();
    expect(test.panel1.dataSources.length).toBe(1);
    expect(test.panel1.conditions.length).toBe(1);
    expect(test.panel1.links.length).toBe(1);

  });

  it('Check conditions one level', async () => {
    const test = new OneLevelMaterDetailsTestDataPanel();
    expect(test.panel1).toBeDefined();

    await test.dataSource1.reload();

    await when(() => {
      return !test.panel1.links[0].isVisible;
    });

    test.dataSource1.setSelectedIndex(2);

    await when(() => {
      return test.panel1.links[0].isVisible;
    });

    test.dataSource1.setSelectedIndex(4);
    await when(() => {
      return !test.panel1.links[0].isVisible;
    });


  });

  it('Check conditions two levels', async () => {
    const test = new TwoLevelMaterDetailsTestDataPanel();
    expect(test.panel1).toBeDefined();

    await test.dataSource1.reload();


    await when(() => {
      return !test.panel2.links[0].isVisible;
    });

    test.dataSource1.setSelectedIndex(2);
    await TestUtils.waitForRefresh(test.dataSource2);

    test.dataSource2.setSelectedIndex(3);

    await when(() => {
      return test.panel2.links[0].isVisible;
    });


  });


});

