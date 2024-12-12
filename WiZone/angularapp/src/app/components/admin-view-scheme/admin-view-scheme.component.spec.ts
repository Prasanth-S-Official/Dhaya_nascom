import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewSchemeComponent } from './admin-view-scheme.component';

describe('AdminViewSchemeComponent', () => {
  let component: AdminViewSchemeComponent;
  let fixture: ComponentFixture<AdminViewSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewSchemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
