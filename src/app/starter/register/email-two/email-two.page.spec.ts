import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmailTwoPage } from './email-two.page';

describe('EmailTwoPage', () => {
  let component: EmailTwoPage;
  let fixture: ComponentFixture<EmailTwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailTwoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
