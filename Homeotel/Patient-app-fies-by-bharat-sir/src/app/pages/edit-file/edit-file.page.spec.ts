import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditFilePage } from './edit-file.page';

describe('EditFilePage', () => {
  let component: EditFilePage;
  let fixture: ComponentFixture<EditFilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditFilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
