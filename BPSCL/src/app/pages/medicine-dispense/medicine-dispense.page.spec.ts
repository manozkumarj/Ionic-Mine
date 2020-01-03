import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MedicineDispensePage } from './medicine-dispense.page';

describe('MedicineDispensePage', () => {
  let component: MedicineDispensePage;
  let fixture: ComponentFixture<MedicineDispensePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicineDispensePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MedicineDispensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
