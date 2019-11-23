import {TestBed} from '@angular/core/testing';
import {ApplicationState} from '../application.state';
import {RouteState} from '../route.state';
import {AdministrationPackage} from '../../meta/samples/administration.package';
import {AppComponent} from '../../app.component';
import {PanelComponent} from '../../components/panel/panel.component';
import {ListComponent} from '../../components/list/list.component';
import {BrowserModule} from '@angular/platform-browser';
import {MobxAngularModule} from 'mobx-angular';
import {Router, RouterModule, Routes} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {MetadataResolver} from '../matadata.resolver';

describe('OfficerGrants page tests', () => {
  const routes: Routes = [
    {
      path: '**',
      component: AppComponent,
    },
  ];
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        PanelComponent,
        ListComponent
      ],
      imports: [
        BrowserModule,
        MobxAngularModule,
        RouterModule.forRoot(routes)
      ],
      providers: [ApplicationState, RouterModule, RouteState, MetadataResolver, {provide: APP_BASE_HREF, useValue: '/'}]
    });
    router = TestBed.get(Router);
  });


  it('Check page loaded', async () => {
    expect(router).not.toBeNull();
    const application = new ApplicationState(new RouteState(router));
    application.metadataResolver.addMetadataPackage('test', AdministrationPackage.package);
    application.navigate('/test/administration');

  });


});

