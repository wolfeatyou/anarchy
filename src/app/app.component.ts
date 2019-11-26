import {Component, Inject, ViewEncapsulation} from '@angular/core';
import {ApplicationState} from './stores/application.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'anarchy2';

  constructor(@Inject(ApplicationState) private appState: ApplicationState) {

    //const test = new PanelsVisiblityTestDataNew();

    /*    setTimeout(() => {
          const test = new PanelsVisiblityTestDataNew();
          test.init('officersAndGrantsPanel');
          this.appState = test.appState;
        }, 250);*/
  }

  get ActivePanel() {
    return this.appState.currentPage;
  }
}
