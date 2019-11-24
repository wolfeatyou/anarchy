import {ApplicationState} from '../application.state';
import {RouteState} from '../route.state';
import {AdministrationPackage} from '../../meta/samples/administration.package';
import {when} from 'mobx';
import {TestUtils} from '../../utils/TestUtils';
import {BarState} from '../bar.state';
import {PartState} from '../part.state';

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
  });


});

