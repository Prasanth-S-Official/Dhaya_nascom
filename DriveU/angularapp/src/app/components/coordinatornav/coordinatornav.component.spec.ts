import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinatornavComponent } from './coordinatornav.component';

describe('CoordinatornavComponent', () => {
  let component: CoordinatornavComponent;
  let fixture: ComponentFixture<CoordinatornavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordinatornavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordinatornavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
