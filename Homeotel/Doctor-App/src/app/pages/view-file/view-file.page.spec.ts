import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewFilePage } from './view-file.page';

describe('ViewFilePage', () => {
  let component: ViewFilePage;
  let fixture: ComponentFixture<ViewFilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewFilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewFilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
