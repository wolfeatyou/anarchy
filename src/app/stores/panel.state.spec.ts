import {configure, runInAction} from 'mobx';
import {async} from '@angular/core/testing';
import {OneLevelMaterDetailsTestData} from './test/OneLevelMasterDetails.testdata';
import {TestUtils} from '../utils/TestUtils';
import {OneLevelMaterDetailsTestDataPanel} from './test/OneLevelMasterDetailsPanel.testdata';



describe('Panel tests', () => {

  beforeEach(async(() => {
    configure({enforceActions: 'always'});

  }));

  it('Check panel constructed', async () => {
    const test = new OneLevelMaterDetailsTestDataPanel();
    expect(test.panel1).toBeDefined();
    expect(test.panel1.dataSources.length).toBe(1);
    expect(test.panel1.conditions.length).toBe(1);

  });


});

