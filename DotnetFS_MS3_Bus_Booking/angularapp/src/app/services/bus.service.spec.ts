// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import { TestBed } from '@angular/core/testing';
// import { Bus } from '../models/bus.model';
// import { BusService } from './bus.service';

// describe('BusService', () => {
//   let service: BusService;
//   let httpTestingController: HttpTestingController;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [BusService],
//     });
//     service = TestBed.inject(BusService);
//     httpTestingController = TestBed.inject(HttpTestingController);
//   });

//   afterEach(() => {
//     httpTestingController.verify();
//   });

//   fit('BusService_should_be_created', () => {
//     expect(service).toBeTruthy();
//   });

//   fit('BusService_should_add_a_Bus', () => {
//     const mockBus: Bus = {
//       bookingId: 1,
//       busNumber: 'Test Bus Number',
//       routeSource: 'Test Route Source',
//       routeDestination: 'Test Route Destination',
//       passengerName: 'Test Passenger Name',
//       bookingDate: '2024-05-15'
//     };

//     (service as any).addBus(mockBus).subscribe((bus) => { expect(bus).toEqual(mockBus) });
//     const req = httpTestingController.expectOne(`${service['apiUrl']}/api/Bus`);
//     expect(req.request.method).toBe('POST');
//     req.flush(mockBus);
//   });

//   fit('BusService_should_get_Buses', () => {
//     const mockBuses: Bus[] = [
//       {
//         bookingId: 1,
//         busNumber: 'Test Bus Number',
//         routeSource: 'Test Route Source',
//         routeDestination: 'Test Route Destination',
//         passengerName: 'Test Passenger Name',
//         bookingDate: '2024-05-15'
//       }
//     ];

//     (service as any).getBuses().subscribe((buses) => { expect(buses).toEqual(mockBuses) });
//     const req = httpTestingController.expectOne(`${service['apiUrl']}/api/Bus`);
//     expect(req.request.method).toBe('GET');
//     req.flush(mockBuses);
//   });

//   fit('BusService_should_delete_Bus', () => {
//     const bookingId = 100;

//     (service as any).deleteBus(bookingId).subscribe(() => { expect().nothing() });
//     const req = httpTestingController.expectOne(`${service['apiUrl']}/api/Bus/${bookingId}`);
//     expect(req.request.method).toBe('DELETE');
//     req.flush({});
//   });

//   fit('BusService_should_get_Bus_by_id', () => {
//     const bookingId = 100;
//     const mockBus: Bus = {
//       bookingId: bookingId,
//       busNumber: 'Test Bus Number',
//       routeSource: 'Test Route Source',
//       routeDestination: 'Test Route Destination',
//       passengerName: 'Test Passenger Name',
//       bookingDate: '2024-05-15'
//     };

//     (service as any).getBusById(bookingId).subscribe((bus) => { expect(bus).toEqual(mockBus) });
//     const req = httpTestingController.expectOne(`${service['apiUrl']}/api/Bus/${bookingId}`);
//     expect(req.request.method).toBe('GET');
//     req.flush(mockBus);
//   });

//   fit('BusService_should_update_Bus', () => {
//     const bookingId = 100;
//     const updatedBus: Bus = {
//       bookingId: bookingId,
//       busNumber: 'Updated Bus Number',
//       routeSource: 'Updated Route Source',
//       routeDestination: 'Updated Route Destination',
//       passengerName: 'Updated Passenger Name',
//       bookingDate: '2024-05-20'
//     };

//     (service as any).updateBus(bookingId, updatedBus).subscribe((bus) => { expect(bus).toEqual(updatedBus) });
//     const req = httpTestingController.expectOne(`${service['apiUrl']}/api/Bus/${bookingId}`);
//     expect(req.request.method).toBe('PUT');
//     req.flush(updatedBus);
//   });

// });


import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Bus } from '../models/bus.model';
import { BusService } from './bus.service';

describe('BusService', () => {
  let service: BusService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BusService],
    });
    service = TestBed.inject(BusService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  fit('BusService_should_be_created', () => {
    expect(service).toBeTruthy();
  });

  fit('BusService_should_add_a_Bus', () => {
    const mockBus: Bus = {
      id: 1,
      busNumber: 'Test Bus Number',
      routeSource: 'Test Route Source',
      routeDestination: 'Test Route Destination',
      passengerName: 'Test Passenger Name',
      bookingDate: '2024-05-15',
    };

    service.addBus(mockBus).subscribe((bus) => {
      expect(bus).toEqual(mockBus);
    });
    const req = httpTestingController.expectOne(`${service['apiUrl']}/buses`);
    expect(req.request.method).toBe('POST');
    req.flush(mockBus);
  });

  fit('BusService_should_get_Buses', () => {
    const mockBuses: Bus[] = [
      {
        id: 1,
        busNumber: 'Test Bus Number',
        routeSource: 'Test Route Source',
        routeDestination: 'Test Route Destination',
        passengerName: 'Test Passenger Name',
        bookingDate: '2024-05-15',
      },
    ];

    service.getBuses().subscribe((buses) => {
      expect(buses).toEqual(mockBuses);
    });
    const req = httpTestingController.expectOne(`${service['apiUrl']}/buses`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBuses);
  });

  fit('BusService_should_delete_Bus', () => {
    const id = 100;

    service.deleteBus(id).subscribe(() => {
      expect().nothing();
    });
    const req = httpTestingController.expectOne(`${service['apiUrl']}/buses/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  fit('BusService_should_get_Bus_by_id', () => {
    const id = 100;
    const mockBus: Bus = {
      id: id,
      busNumber: 'Test Bus Number',
      routeSource: 'Test Route Source',
      routeDestination: 'Test Route Destination',
      passengerName: 'Test Passenger Name',
      bookingDate: '2024-05-15',
    };

    service.getBusById(id).subscribe((bus) => {
      expect(bus).toEqual(mockBus);
    });
    const req = httpTestingController.expectOne(`${service['apiUrl']}/buses/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockBus);
  });

  fit('BusService_should_update_Bus', () => {
    const id = 100;
    const updatedBus: Bus = {
      id: id,
      busNumber: 'Updated Bus Number',
      routeSource: 'Updated Route Source',
      routeDestination: 'Updated Route Destination',
      passengerName: 'Updated Passenger Name',
      bookingDate: '2024-05-20',
    };

    service.updateBus(id, updatedBus).subscribe((bus) => {
      expect(bus).toEqual(updatedBus);
    });
    const req = httpTestingController.expectOne(`${service['apiUrl']}/buses/${id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedBus);
  });
});
