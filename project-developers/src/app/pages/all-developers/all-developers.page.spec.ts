import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllDevelopersPage } from './all-developers.page';

describe('AllDevelopersPage', () => {
  let component: AllDevelopersPage;
  let fixture: ComponentFixture<AllDevelopersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDevelopersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllDevelopersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
