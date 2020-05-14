import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoctorPersonalPage } from './doctor-personal.page';

describe('DoctorPersonalPage', () => {
  let component: DoctorPersonalPage;
  let fixture: ComponentFixture<DoctorPersonalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorPersonalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorPersonalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
