import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddRelativePage } from './add-relative.page';

describe('AddRelativePage', () => {
  let component: AddRelativePage;
  let fixture: ComponentFixture<AddRelativePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRelativePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddRelativePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
