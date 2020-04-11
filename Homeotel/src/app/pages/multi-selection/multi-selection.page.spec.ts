import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MultiSelectionPage } from './multi-selection.page';

describe('MultiSelectionPage', () => {
  let component: MultiSelectionPage;
  let fixture: ComponentFixture<MultiSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiSelectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MultiSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
