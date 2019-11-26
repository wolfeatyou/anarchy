import {ApplicationState} from '../application.state';
import {RouteState} from '../route.state';
import {AdministrationPackage} from '../../meta/samples/administration.package';
import {when} from 'mobx';
import {TestUtils} from '../../utils/TestUtils';
import {BarState} from '../bar.state';
import {PartState} from '../part.state';
import {PlaceholderState} from "../placeholder.state";

describe('OfficerGrants page tests', () => {
  beforeEach(() => {
  });


  it('Check page loaded', async () => {
    const application = new ApplicationState(new RouteState(null));
    application.metadataResolver.addMetadataPackage('test', AdministrationPackage.package);
    application.navigate('/test/administration');
    await TestUtils.waitForCondition(() => application.currentPage != null);

    expect(application.currentPage.metadata.code).toBe('administration');
    expect(application.currentPage.parts.length).toBe(2);
    expect(application.currentPage.parts[0] instanceof BarState).toBeTruthy();

    const bar = application.currentPage.parts[0] as BarState;
    expect(bar.items.length).toBe(2);
    const pl1 = application.currentPage.parts[1] as PlaceholderState;
    const v = pl1.panel.Visible;
  });


});

