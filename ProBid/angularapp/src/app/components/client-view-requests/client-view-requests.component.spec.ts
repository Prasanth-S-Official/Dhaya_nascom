import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientViewRequestsComponent } from './client-view-requests.component';

describe('ClientViewRequestsComponent', () => {
  let component: ClientViewRequestsComponent;
  let fixture: ComponentFixture<ClientViewRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientViewRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientViewRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
