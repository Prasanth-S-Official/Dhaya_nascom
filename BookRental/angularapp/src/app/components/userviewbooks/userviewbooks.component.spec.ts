import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserviewbooksComponent } from './userviewbooks.component';

describe('UserviewbooksComponent', () => {
  let component: UserviewbooksComponent;
  let fixture: ComponentFixture<UserviewbooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserviewbooksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserviewbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
