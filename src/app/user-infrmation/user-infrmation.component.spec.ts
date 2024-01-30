import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfrmationComponent } from './user-infrmation.component';

describe('UserInfrmationComponent', () => {
  let component: UserInfrmationComponent;
  let fixture: ComponentFixture<UserInfrmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserInfrmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserInfrmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
