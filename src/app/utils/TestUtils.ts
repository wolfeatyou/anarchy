import {DataSourceState, DataSourceStatus} from '../stores/DataSourceState/datasource.state';
import {when} from 'mobx';
import {retry} from 'rxjs/operators';

export class TestUtils {
  static async waitForRefresh(state: DataSourceState, untilCounter: number = 100) {

    /*await when(() => {
      return state.reloadCounter >= untilCounter;
    });*/

    if (state.reloadCounter < untilCounter) {
      console.log('test: wait for refresh ' + untilCounter + 'rel count:' + state.reloadCounter);
      if (state.status === DataSourceStatus.Loaded) {
        console.log('test: wait ' + DataSourceStatus.MustRefresh);
        await when(() => {
          return state.status === DataSourceStatus.MustRefresh || state.reloadCounter >= untilCounter;
        });
      }
      console.log('test: wait ' + DataSourceStatus.Loaded);
      await when(() => {
        return state.status === DataSourceStatus.Loaded;
      });
    }

  }

  static async waitForCondition(predicate: () => boolean) {
    console.log('test: wait for condition:' + predicate);
    await when(predicate);
    console.log('test:ok');
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
