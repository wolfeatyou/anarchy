import {DataSourceState, DataSourceStatus} from '../stores/DataSourceState/datasource.state';
import {when} from 'mobx';

export class TestUtils {
  static async waitForRefresh(state: DataSourceState) {
    await when(() => {
      return state.status === DataSourceStatus.MustRefresh;
    });
    await when(() => {
      return state.status === DataSourceStatus.Loaded;
    });
  }
}
