import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientViewProjectsComponent } from './client-view-projects.component';

describe('ClientViewProjectsComponent', () => {
  let component: ClientViewProjectsComponent;
  let fixture: ComponentFixture<ClientViewProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientViewProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientViewProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
