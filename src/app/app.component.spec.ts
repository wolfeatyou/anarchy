import {async, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {ApplicationState} from './stores/application.state';
import {RouterModule, Routes} from '@angular/router';
import {RouteState} from './stores/route.state';
import {PanelComponent} from './components/panel/panel.component';
import {ListComponent} from './components/list/list.component';
import {BrowserModule} from '@angular/platform-browser';
import {MobxAngularModule} from 'mobx-angular';
import {APP_BASE_HREF} from '@angular/common';

const routes: Routes = [
  {
    path: '**',
    component: AppComponent,
  },
];
describe('AppComponent', () => {
  beforeEach(async(() => {
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
      providers: [ApplicationState, RouterModule, RouteState,  { provide: APP_BASE_HREF, useValue : '/' }]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'anarchy2'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('anarchy2');
  });

  it('should render title', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.app-layout div').textContent).toContain('application is loading');

    const rs  = TestBed.get(RouteState);
    rs.router.navigateByUrl('/officersAndGrantsPanel');
    tick(1);
    fixture.detectChanges();

    compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.app-layout div').textContent).toContain('application is loading');

  }));
});
