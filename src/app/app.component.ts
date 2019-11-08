import {Component, ViewEncapsulation} from '@angular/core';
import {ApplicationState} from './stores/application.state';
import {PanelsVisiblityTestDataNew} from './stores/test/PanelsVisiblityTestNew.testdata';
import {PanelState} from './stores/panel.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'anarchy2';

  constructor(private appState: ApplicationState) {

    setTimeout(() => {
      const test = new PanelsVisiblityTestDataNew();
      test.init('officersAndGrantsPanel');
      this.appState = test.appState;
    }, 250);
  }

  get ActivePanel() {
    return this.appState.activePanel;
  }
}
