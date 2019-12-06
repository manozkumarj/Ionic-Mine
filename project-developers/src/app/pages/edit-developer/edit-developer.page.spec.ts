import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditDeveloperPage } from './edit-developer.page';

describe('EditDeveloperPage', () => {
  let component: EditDeveloperPage;
  let fixture: ComponentFixture<EditDeveloperPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeveloperPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDeveloperPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
