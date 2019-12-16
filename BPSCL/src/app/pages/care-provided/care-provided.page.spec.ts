import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CareProvidedPage } from './care-provided.page';

describe('CareProvidedPage', () => {
  let component: CareProvidedPage;
  let fixture: ComponentFixture<CareProvidedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareProvidedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CareProvidedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
