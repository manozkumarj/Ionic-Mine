import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SessionSelectionPage } from './session-selection.page';

describe('SessionSelectionPage', () => {
  let component: SessionSelectionPage;
  let fixture: ComponentFixture<SessionSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionSelectionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SessionSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
