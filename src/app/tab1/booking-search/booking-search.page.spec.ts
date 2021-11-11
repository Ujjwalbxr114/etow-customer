import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BookingSearchPage } from './booking-search.page';

describe('BookingSearchPage', () => {
  let component: BookingSearchPage;
  let fixture: ComponentFixture<BookingSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BookingSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
