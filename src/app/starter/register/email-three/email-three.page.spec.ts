import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmailThreePage } from './email-three.page';

describe('EmailThreePage', () => {
  let component: EmailThreePage;
  let fixture: ComponentFixture<EmailThreePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailThreePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailThreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
