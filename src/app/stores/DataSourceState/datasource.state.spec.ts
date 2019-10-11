import {configure, runInAction, when} from 'mobx';
import {DataSourceState, DataSourceStatus} from './datasource.state';
// @ts-ignore
import {async} from '@angular/core/testing';
import {ApplicationState} from '../application.state';


describe('Data Source test', () => {

  beforeEach(async(() => {
    configure({enforceActions: 'always'});
    /* TestBed.configureTestingModule({
       declarations: [
         AppComponent
       ],
       providers: [ApplicationState]
     }).compileComponents();*/
  }));

  // @ts-ignore
  it('init from metadata test', async () => {

    const appState: ApplicationState = new ApplicationState();
    const dataSource1 = new DataSourceState('ds001', {
      code: 'ds1',
      operations: [
        {
          code: 'readOperation',
          type: 'read',
          parameters: [
            {
              code: 'param1'
            }
          ]
        }
      ]
    }, appState);

    const dataSource2 = new DataSourceState('ds002', {
      code: 'ds2',
      operations: [
        {
          code: 'readOperation',
          type: 'read',
          parameters: [
            {
              code: 'param1',
              source: {
                dataSourceId: 'ds001',
                dataItemProperty: 'title'
              }
            }
          ]
        }
      ]
    }, appState);
    await dataSource1.reload();

    runInAction(() => {
      dataSource1.selectedDataItem.title = 'title 1';
    });

    dataSource1.setSelectedIndex(1);

    runInAction(() => {
      dataSource1.selectedDataItem.title = 'title 2';
    });

    await when(() => {
      return dataSource2.status === DataSourceStatus.Loaded;
    });
  });

  // @ts-ignore
  xit('reload sample ', async () => {

    /*const appState: ApplicationState = new ApplicationState();

    const dataSource1 = new DataSourceState('001', appState);
    const dataSource2 = new DataSourceState('002', appState);

    dataSource1.addChildSource(dataSource2);
    dataSource2.addParentSource(dataSource1);


    await dataSource1.reload();
    dataSource1.selected.title = 'aaa';*/
  });
});

