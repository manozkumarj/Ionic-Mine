import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VitalsPage } from './vitals.page';

describe('VitalsPage', () => {
  let component: VitalsPage;
  let fixture: ComponentFixture<VitalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VitalsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VitalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
