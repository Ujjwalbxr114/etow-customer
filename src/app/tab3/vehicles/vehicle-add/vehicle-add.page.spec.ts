import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VehicleAddPage } from './vehicle-add.page';

describe('VehicleAddPage', () => {
  let component: VehicleAddPage;
  let fixture: ComponentFixture<VehicleAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VehicleAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
