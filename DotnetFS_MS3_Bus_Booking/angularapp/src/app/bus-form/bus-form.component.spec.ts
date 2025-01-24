import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BusFormComponent } from './bus-form.component';
import { BusService } from '../services/bus.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Bus } from '../models/bus.model';
import { BusListComponent } from '../bus-list/bus-list.component';

describe('BusFormComponent', () => {
  let component: BusFormComponent;
  let fixture: ComponentFixture<BusFormComponent>;
  let busService: BusService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusFormComponent],
      imports: [FormsModule,
        RouterTestingModule.withRoutes([{ path: 'viewBuses', component: BusListComponent }]),
        HttpClientTestingModule],
      providers: [BusService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusFormComponent);
    component = fixture.componentInstance;
    busService = TestBed.inject(BusService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  fit('should_create_BusFormComponent', () => {
    expect(component).toBeTruthy();
  });

  fit('BusFormComponent_should_render_error_messages_when_required_fields_are_empty_on_submit', () => {
    (component as any).newBus = {
      bookingId: null,
      busNumber: '',
      routeSource: '',
      routeDestination: '',
      passengerName: '',
      bookingDate: ''
    };

    fixture.detectChanges();
    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();

    // Check if error messages are rendered for each field
    expect(fixture.debugElement.query(By.css('#busNumber + .error-message'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#routeSource + .error-message'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#routeDestination + .error-message'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#passengerName + .error-message'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#bookingDate + .error-message'))).toBeTruthy();
  });


  fit('BusFormComponent_should_call_addBus_method_while_adding_the_bus', () => {
    const bus: Bus = {
      bookingId: 1,
      busNumber: 'Test Bus Number',
      routeSource: 'Test Source',
      routeDestination: 'Test Destination',
      passengerName: 'Test Passenger',
      bookingDate: '2024-05-22'
    };

    (component as any).newBus = bus;
    const addBusSpy = spyOn((busService as any), 'addBus').and.returnValue(of(bus));
    (component as any).addOrEditBus();
    expect(addBusSpy).toHaveBeenCalledWith(bus);
  });

  fit('BusFormComponent_should_call_updateBus_method_while_editing_the_bus', () => {
    const bus: Bus = {
      bookingId: 1,
      busNumber: 'Test Bus Number',
      routeSource: 'Test Source',
      routeDestination: 'Test Destination',
      passengerName: 'Test Passenger',
      bookingDate: '2024-05-22'
    };

    (component as any).newBus = bus;
    (component as any).isEditMode = true;
    const updateBusSpy = spyOn((busService as any), 'updateBus').and.returnValue(of(bus)); 
    (component as any).addOrEditBus();
    expect(updateBusSpy).toHaveBeenCalledWith(bus.bookingId, bus);
  });

});
