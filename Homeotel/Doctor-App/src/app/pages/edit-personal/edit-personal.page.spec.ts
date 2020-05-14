import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditPersonalPage } from './edit-personal.page';

describe('EditPersonalPage', () => {
  let component: EditPersonalPage;
  let fixture: ComponentFixture<EditPersonalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPersonalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPersonalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
