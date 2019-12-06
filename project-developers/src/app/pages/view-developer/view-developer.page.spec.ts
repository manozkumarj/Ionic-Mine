import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewDeveloperPage } from './view-developer.page';

describe('ViewDeveloperPage', () => {
  let component: ViewDeveloperPage;
  let fixture: ComponentFixture<ViewDeveloperPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDeveloperPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewDeveloperPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
