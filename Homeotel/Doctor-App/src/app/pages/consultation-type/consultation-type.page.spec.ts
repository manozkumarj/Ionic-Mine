import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConsultationTypePage } from './consultation-type.page';

describe('ConsultationTypePage', () => {
  let component: ConsultationTypePage;
  let fixture: ComponentFixture<ConsultationTypePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultationTypePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultationTypePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
