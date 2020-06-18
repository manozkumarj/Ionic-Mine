import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditLifestylePage } from './edit-lifestyle.page';

describe('EditLifestylePage', () => {
  let component: EditLifestylePage;
  let fixture: ComponentFixture<EditLifestylePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLifestylePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditLifestylePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
