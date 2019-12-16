import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditStaffPage } from './edit-staff.page';

describe('EditStaffPage', () => {
  let component: EditStaffPage;
  let fixture: ComponentFixture<EditStaffPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStaffPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditStaffPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
