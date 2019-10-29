import {DataSourceState, DataSourceStatus} from '../stores/DataSourceState/datasource.state';
import {when} from 'mobx';

export class TestUtils {
  static async waitForRefresh(state: DataSourceState) {
    console.log('test: wait for refresh');
    await when(() => {
      return state.status === DataSourceStatus.MustRefresh;
    });
    await when(() => {
      return state.status === DataSourceStatus.Loaded;
    });
  }

  static async waitForCondition(predicate: () => boolean) {
    console.log('test: wait for refresh');
    await when(predicate);
  }

  static async checkIsNot(predicate: () => boolean): Promise<boolean> {
    let throwed = false;
    await when(predicate,
      {
        timeout: 550
      }).catch(() => {
        throwed = true;
    });
    return throwed;
  }


}
