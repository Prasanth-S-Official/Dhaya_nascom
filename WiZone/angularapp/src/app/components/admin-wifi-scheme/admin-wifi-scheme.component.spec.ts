import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWifiSchemeComponent } from './admin-wifi-scheme.component';

describe('AdminWifiSchemeComponent', () => {
  let component: AdminWifiSchemeComponent;
  let fixture: ComponentFixture<AdminWifiSchemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWifiSchemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWifiSchemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
