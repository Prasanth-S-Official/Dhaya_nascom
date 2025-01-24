import { Bus } from './bus.model'; 

describe('Bus', () => { 
  fit('should_create_bus_instance', () => { 
    const bus: Bus = { 
      bookingId: 1, 
      busNumber: 'Test Bus Number', 
      routeSource: 'Test Route Source', 
      routeDestination: 'Test Route Destination', 
      passengerName: 'Test Passenger Name', 
      bookingDate: '2024-05-15' 
    };

    expect(bus).toBeTruthy();
    expect(bus.bookingId).toBe(1); 
    expect(bus.busNumber).toBe('Test Bus Number'); 
    expect(bus.routeSource).toBe('Test Route Source'); 
    expect(bus.routeDestination).toBe('Test Route Destination'); 
    expect(bus.passengerName).toBe('Test Passenger Name'); 
    expect(bus.bookingDate).toBe('2024-05-15'); 
  });
});
