import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConsumableDispensePage } from './consumable-dispense.page';

describe('ConsumableDispensePage', () => {
  let component: ConsumableDispensePage;
  let fixture: ComponentFixture<ConsumableDispensePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsumableDispensePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConsumableDispensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
