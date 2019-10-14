import {configure, runInAction, when} from 'mobx';
import {DataSourceState, DataSourceStatus} from './datasource.state';
// @ts-ignore
import {async} from '@angular/core/testing';
import {ApplicationState} from '../application.state';
import {IDataSourceMeta} from '../../meta/DataSourceMeta';
import {validate} from 'class-validator';


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

  it('ds metadata to interface', () => {
    const someObj = {
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
    };

    const dsMeta = someObj as IDataSourceMeta;


    validate(dsMeta, { forbidUnknownValues: true}).then(errors => { // errors is an array of validation errors
      if (errors.length > 0) {
        console.log('validation failed. errors: ', errors);      } else {
        console.log('validation succeed');
      }
    });


    expect(dsMeta.code).toBe('ds1');
    expect(dsMeta.operations.length).toBe(1);
  });

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
            },
            {
              code: 'param2',
              source: {
                dataSourceId: 'ds001',
                dataItemProperty: 'desc'
              }
            }
          ]
        }
      ]
    }, appState);
    await dataSource1.reload();

    dataSource1.setSelectedIndex(1);

    runInAction(() => {
      dataSource1.selectedDataItem.title = 'title 2';
      dataSource1.selectedDataItem.desc = 'desc 2';
    });

    await when(() => {
      return dataSource2.reloadCounter === 3;
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

