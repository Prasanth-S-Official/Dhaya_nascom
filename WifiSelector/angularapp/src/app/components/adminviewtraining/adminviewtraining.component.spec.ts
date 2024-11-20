import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminviewtrainingComponent } from './adminviewtraining.component';

describe('AdminviewtrainingComponent', () => {
  let component: AdminviewtrainingComponent;
  let fixture: ComponentFixture<AdminviewtrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminviewtrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminviewtrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
