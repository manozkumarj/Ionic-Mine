import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FamilyMembersPage } from './family-members.page';

describe('FamilyMembersPage', () => {
  let component: FamilyMembersPage;
  let fixture: ComponentFixture<FamilyMembersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyMembersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FamilyMembersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
