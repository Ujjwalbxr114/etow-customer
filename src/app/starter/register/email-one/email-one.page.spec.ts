import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmailOnePage } from './email-one.page';

describe('EmailOnePage', () => {
  let component: EmailOnePage;
  let fixture: ComponentFixture<EmailOnePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailOnePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailOnePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
