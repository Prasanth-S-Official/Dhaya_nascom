import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddtrainingComponent } from './adminaddtraining.component';

describe('AdminaddtrainingComponent', () => {
  let component: AdminaddtrainingComponent;
  let fixture: ComponentFixture<AdminaddtrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminaddtrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminaddtrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
