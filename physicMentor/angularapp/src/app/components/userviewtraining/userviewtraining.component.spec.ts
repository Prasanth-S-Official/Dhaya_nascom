import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserviewtrainingComponent } from './userviewtraining.component';

describe('UserviewtrainingComponent', () => {
  let component: UserviewtrainingComponent;
  let fixture: ComponentFixture<UserviewtrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserviewtrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserviewtrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
