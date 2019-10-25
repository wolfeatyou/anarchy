import {DataSourceState, DataSourceStatus} from '../stores/DataSourceState/datasource.state';
import {when} from 'mobx';

export class TestUtils {
  static async waitForRefresh(state: DataSourceState) {
    console.log('test: wait for refresh')
    await when(() => {
      return state.status === DataSourceStatus.MustRefresh;
    });
    await when(() => {
      return state.status === DataSourceStatus.Loaded;
    });
  }
}
