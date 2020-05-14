import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeoKitsPage } from './homeo-kits.page';

describe('HomeoKitsPage', () => {
  let component: HomeoKitsPage;
  let fixture: ComponentFixture<HomeoKitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeoKitsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeoKitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
