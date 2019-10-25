import {autorun, configure, runInAction, spy, when, trace} from 'mobx';
import {async} from '@angular/core/testing';
import {TestUtils} from '../utils/TestUtils';
import {OneLevelMaterDetailsTestDataPanel} from './test/OneLevelMasterDetailsPanel.testdata';
import {TwoLevelMaterDetailsTestDataPanel} from './test/TwoLevelMasterDetails.testdata';
import {TreeLevelMaterDetailsTestDataPanel} from './test/TreeLevelMasterDetails.testdata';


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

     await test.dataSource1.reload();
     console.log('test: data reloaded');

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
     console.log('test: object constructed');
     await test.dataSource1.reload();
     console.log('test: data reloaded');

     await when(() => {
       return !test.panel2.links[0].isVisible;
     });

     console.log('test: set selected index 2');
     test.dataSource1.setSelectedIndex(2);

     await TestUtils.waitForRefresh(test.dataSource2);

     console.log('test: set selected index 3');
     test.dataSource2.setSelectedIndex(3);

     await when(() => {
       return test.panel2.links[0].isVisible;
     });


  });

  it('Check conditions three levels', async () => {
    const test = new TreeLevelMaterDetailsTestDataPanel();
    await test.dataSource1.reload();
    console.log('test: data reloaded');

    await when(() => {
      return !test.panel3.links[0].isVisible;
    });

    console.log('test: set selected index 2');
    test.dataSource1.setSelectedIndex(2);

    await TestUtils.waitForRefresh(test.dataSource2);

    console.log('test: set selected index 3');
    test.dataSource2.setSelectedIndex(3);
    await TestUtils.waitForRefresh(test.dataSource2);

    await when(() => {
      return test.panel3.links[0].isVisible;
    });


  });


});

