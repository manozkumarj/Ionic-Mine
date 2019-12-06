import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDeveloperPage } from './add-developer.page';

describe('AddDeveloperPage', () => {
  let component: AddDeveloperPage;
  let fixture: ComponentFixture<AddDeveloperPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDeveloperPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDeveloperPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
