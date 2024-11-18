import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminviewbookComponent } from './adminviewbook.component';

describe('AdminviewbookComponent', () => {
  let component: AdminviewbookComponent;
  let fixture: ComponentFixture<AdminviewbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminviewbookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminviewbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
