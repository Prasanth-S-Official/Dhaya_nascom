import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewProductComponentComponent } from './admin-view-product-component.component';

describe('AdminViewProductComponentComponent', () => {
  let component: AdminViewProductComponentComponent;
  let fixture: ComponentFixture<AdminViewProductComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewProductComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewProductComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
