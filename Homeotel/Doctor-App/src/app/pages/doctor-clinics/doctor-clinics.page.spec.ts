import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoctorClinicsPage } from './doctor-clinics.page';

describe('DoctorClinicsPage', () => {
  let component: DoctorClinicsPage;
  let fixture: ComponentFixture<DoctorClinicsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorClinicsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorClinicsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
