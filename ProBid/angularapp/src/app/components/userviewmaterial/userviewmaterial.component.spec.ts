import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserviewmaterialComponent } from './userviewmaterial.component';

describe('UserviewmaterialComponent', () => {
  let component: UserviewmaterialComponent;
  let fixture: ComponentFixture<UserviewmaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserviewmaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserviewmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
