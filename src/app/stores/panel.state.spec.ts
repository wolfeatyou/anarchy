import {configure, when} from 'mobx';
import {async} from '@angular/core/testing';
import {TestUtils} from '../utils/TestUtils';
import {OneLevelMaterDetailsTestDataPanel} from './test/OneLevelMasterDetailsPanel.testdata';
import {TwoLevelMaterDetailsTestDataPanel} from './test/TwoLevelMasterDetails.testdata';
import {TreeLevelMaterDetailsTestDataPanel} from './test/TreeLevelMasterDetails.testdata';
import {PanelsVisiblityTestData} from './test/PanelsVisiblityTest.testdata';


describe('Panel tests', () => {

  beforeEach(async(() => {
    configure({enforceActions: 'always'});
    /* spy(event => {
       if (event.type === 'reaction') {
         console.log(`reaction: ${event.name}`);
       }
     });*/

  }));

  it('Check panel constructed', async () => {
    const test = new OneLevelMaterDetailsTestDataPanel();
    expect(test.panel1).toBeDefined();
    expect(test.panel1.dataSources.length).toBe(1);
    expect(test.panel1.conditions.length).toBe(1);
    expect(test.panel1.links.length).toBe(1);

  });

  it('Check conditions one level', async () => {
    console.log('test: object constructed');
    const test = new OneLevelMaterDetailsTestDataPanel();
    expect(test.panel1).toBeDefined();

    await TestUtils.waitForRefresh(test.dataSource1, 1);
    await TestUtils.waitForCondition(() => !test.panel1.links[0].Visible);

    test.dataSource1.setSelectedIndex(2);
    await TestUtils.waitForCondition(() => test.panel1.links[0].Visible);

    test.dataSource1.setSelectedIndex(4);
    await TestUtils.waitForCondition(() => !test.panel1.links[0].Visible);

    expect(test.dataSource1.reloadCounter).toBe(1);

    expect(await TestUtils.checkIsNot(() => test.dataSource1.reloadCounter > 1)).toBe(true);

  });


  it('Check conditions two levels', async () => {
    const test = new TwoLevelMaterDetailsTestDataPanel();
    expect(test.panel1).toBeDefined();
    console.log('test: object constructed');
    await TestUtils.waitForRefresh(test.dataSource1, 1);
    console.log('test: data reloaded');
    await TestUtils.waitForRefresh(test.dataSource2);
    await TestUtils.waitForCondition(() => !test.panel2.links[0].Visible);

    console.log('test: set selected index 2');
    test.dataSource1.setSelectedIndex(2);
    await TestUtils.waitForRefresh(test.dataSource2);

    console.log('test: set selected index 3');
    test.dataSource2.setSelectedIndex(3);
    await TestUtils.waitForCondition(() => test.panel2.links[0].Visible);

    expect(test.dataSource1.reloadCounter).toBe(1);
    expect(test.dataSource2.reloadCounter).toBe(2);
    expect(await TestUtils.checkIsNot(() => test.dataSource2.reloadCounter > 2)).toBe(true);
    console.log('test completed');

  });

  it('Check conditions three levels', async () => {
    const test = new TreeLevelMaterDetailsTestDataPanel();

    await TestUtils.waitForRefresh(test.dataSource1, 1);
    console.log('test: data reloaded');
    await TestUtils.waitForRefresh(test.dataSource3);
    await TestUtils.waitForCondition(() => !test.panel3.links[0].Visible);

    console.log('test: set selected index 2');
    test.dataSource1.setSelectedIndex(2);
    await TestUtils.waitForRefresh(test.dataSource3);

    console.log('test: set selected index 3');
    test.dataSource2.setSelectedIndex(3);
    await TestUtils.waitForRefresh(test.dataSource3);
    await TestUtils.waitForCondition(() => test.panel3.links[0].Visible);

    expect(test.dataSource1.reloadCounter).toBe(1);
    expect(test.dataSource2.reloadCounter).toBe(2);
    expect(test.dataSource3.reloadCounter).toBe(3);

    expect(await TestUtils.checkIsNot(() => test.dataSource1.reloadCounter > 2)).toBe(true);
    console.log('test completed');
  });

  it('Check visibility flow', async () => {
    const test = new PanelsVisiblityTestData();
    test.init();

    await when(() => test.appState.activePanel != null);
    await when(() => test.appState.activePanel.selectedTab != null);
    await when(() => test.appState.activePanel.selectedTabChangeCounter === 2);

    await when(() => test.appState.activePanel.selectedTab.LinkedPanel.Visible === true);
    expect(test.appState.activePanel.selectedTab.LinkedPanel).toBeDefined();
    expect(test.appState.activePanel.selectedTab.LinkedPanel.metadata.code).toBe('officers');
    expect(test.appState.activePanel.tabs[0].LinkedPanel.Visible).toBe(true);
    expect(test.appState.activePanel.tabs[1].LinkedPanel.Visible).toBe(false);

    console.log('test: set roles as selected tab');
    test.appState.activePanel.setSelectedTab('roles');
    await when(() => test.appState.activePanel.tabs[1].LinkedPanel.Visible === true);

    expect(test.appState.activePanel.tabs[0].LinkedPanel.Visible).toBe(false);
    expect(test.appState.activePanel.tabs[1].LinkedPanel.Visible).toBe(true);
    console.log('test completed');
  });


  it('Check ds reload flow based on visibility', async () => {
    const test = new PanelsVisiblityTestData();
    test.init();
    expect(test.appState.activePanel.selectedTab.LinkedPanel).toBeDefined();
    await TestUtils.waitForCondition(() => test.appState.dataSources.officerGroupsDs != null);
    await TestUtils.waitForCondition(() => test.appState.dataSources.officersDs != null);
    const officerGroupsDs = test.appState.getDataSourceById('officerGroupsDs');
    const officersDs = test.appState.getDataSourceById('officersDs');
    await TestUtils.waitForRefresh(officerGroupsDs, 1);
    await TestUtils.waitForRefresh(officersDs, 1);

    console.log('test: set roles as selected tab');

    test.appState.activePanel.setSelectedTab('roles');
    expect(test.appState.activePanel.selectedTab.LinkedPanel).toBeDefined();
    await TestUtils.waitForCondition(() => test.appState.dataSources.rolesDs != null);
    const rolesDs = test.appState.getDataSourceById('rolesDs');
    await TestUtils.waitForRefresh(rolesDs, 1);
    expect(officerGroupsDs.reloadCounter).toBe(1);
    expect(officersDs.reloadCounter).toBe(1);
    expect(rolesDs.reloadCounter).toBe(1);
    console.log('test completed');
  });


});

