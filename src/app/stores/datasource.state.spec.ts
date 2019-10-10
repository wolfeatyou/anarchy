import {DataSourceState} from './datasource.state';
// @ts-ignore
import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from '../app.component';
import {ApplicationState} from './application.state';


describe('Data Source test', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [ApplicationState]
    }).compileComponents();
  }));


  // @ts-ignore
  it('reload sample ', async () => {

    const appState: ApplicationState = new ApplicationState();

    const dataSource1 = new DataSourceState('001', appState);
    const dataSource2 = new DataSourceState('002', appState);

    dataSource1.addChildSource(dataSource2);
    dataSource2.addParentSource(dataSource1);


    await dataSource1.reload();
    dataSource1.selected.title = 'aaa';
  });
});

