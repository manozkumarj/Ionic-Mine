import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StaffAttendancePage } from './staff-attendance.page';

describe('StaffAttendancePage', () => {
  let component: StaffAttendancePage;
  let fixture: ComponentFixture<StaffAttendancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffAttendancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StaffAttendancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
