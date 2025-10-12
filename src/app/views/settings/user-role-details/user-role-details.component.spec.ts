import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRoleDetailsComponent } from './user-role-details.component';

describe('UserRoleDetailsComponent', () => {
  let component: UserRoleDetailsComponent;
  let fixture: ComponentFixture<UserRoleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserRoleDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRoleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
