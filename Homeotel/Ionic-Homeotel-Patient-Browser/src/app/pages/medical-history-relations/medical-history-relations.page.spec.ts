import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicalHistoryRelationsPage } from './medical-history-relations.page';

describe('MedicalHistoryRelationsPage', () => {
  let component: MedicalHistoryRelationsPage;
  let fixture: ComponentFixture<MedicalHistoryRelationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalHistoryRelationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicalHistoryRelationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
