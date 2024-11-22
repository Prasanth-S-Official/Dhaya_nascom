import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminviewschemeComponent } from './adminviewscheme.component';

describe('AdminviewschemeComponent', () => {
  let component: AdminviewschemeComponent;
  let fixture: ComponentFixture<AdminviewschemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminviewschemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminviewschemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
