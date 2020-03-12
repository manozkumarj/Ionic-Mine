import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HealthRecordsPage } from './health-records.page';

describe('HealthRecordsPage', () => {
  let component: HealthRecordsPage;
  let fixture: ComponentFixture<HealthRecordsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthRecordsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HealthRecordsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
