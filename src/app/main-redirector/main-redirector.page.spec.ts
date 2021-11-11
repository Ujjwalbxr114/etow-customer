import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MainRedirectorPage } from './main-redirector.page';

describe('MainRedirectorPage', () => {
  let component: MainRedirectorPage;
  let fixture: ComponentFixture<MainRedirectorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainRedirectorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MainRedirectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
