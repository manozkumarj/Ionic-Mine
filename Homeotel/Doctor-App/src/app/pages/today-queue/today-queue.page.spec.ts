import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodayQueuePage } from './today-queue.page';

describe('TodayQueuePage', () => {
  let component: TodayQueuePage;
  let fixture: ComponentFixture<TodayQueuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodayQueuePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodayQueuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
