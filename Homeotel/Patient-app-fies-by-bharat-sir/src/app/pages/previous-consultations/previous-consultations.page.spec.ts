import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PreviousConsultationsPage } from './previous-consultations.page';

describe('PreviousConsultationsPage', () => {
  let component: PreviousConsultationsPage;
  let fixture: ComponentFixture<PreviousConsultationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviousConsultationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PreviousConsultationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
