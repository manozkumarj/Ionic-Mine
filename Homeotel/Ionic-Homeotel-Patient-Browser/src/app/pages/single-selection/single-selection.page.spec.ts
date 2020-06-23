import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingleSelectionPage } from './single-selection.page';

describe('SingleSelectionPage', () => {
  let component: SingleSelectionPage;
  let fixture: ComponentFixture<SingleSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSelectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
