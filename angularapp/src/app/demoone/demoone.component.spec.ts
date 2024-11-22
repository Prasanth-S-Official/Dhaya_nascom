import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemooneComponent } from './demoone.component';

describe('DemooneComponent', () => {
  let component: DemooneComponent;
  let fixture: ComponentFixture<DemooneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemooneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemooneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should_create_demoone', () => {
    expect(component).toBeTruthy();
  });
});
