import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SlotSelectionPage } from './slot-selection.page';

describe('SlotSelectionPage', () => {
  let component: SlotSelectionPage;
  let fixture: ComponentFixture<SlotSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotSelectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SlotSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
