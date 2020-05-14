import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoctorConsultationModesPage } from './doctor-consultation-modes.page';

describe('DoctorConsultationModesPage', () => {
  let component: DoctorConsultationModesPage;
  let fixture: ComponentFixture<DoctorConsultationModesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorConsultationModesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorConsultationModesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
