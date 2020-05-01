import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditRelationMedicalHistoryPage } from './edit-relation-medical-history.page';

describe('EditRelationMedicalHistoryPage', () => {
  let component: EditRelationMedicalHistoryPage;
  let fixture: ComponentFixture<EditRelationMedicalHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRelationMedicalHistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditRelationMedicalHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
