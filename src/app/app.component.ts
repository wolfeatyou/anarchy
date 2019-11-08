import {Component} from '@angular/core';
import {ApplicationState} from './stores/application.state';
import {PanelsVisiblityTestData} from './stores/test/PanelsVisiblityTest.testdata';
import {PanelState} from './stores/panel.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'anarchy2';

  constructor(private appState: ApplicationState) {

    setTimeout(() => {
      const test = new PanelsVisiblityTestData();
      test.init('officersAndGrantsPanel');
      this.appState = test.appState;
    }, 500);
  }

  get ActivePanel() {
    return this.appState.activePanel;
  }
}
