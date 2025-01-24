
export interface Bus {
  id?: number; // JSON Server uses 'id' as the default key
  busNumber: string;
  routeSource: string;
  routeDestination: string;
  passengerName: string;
  bookingDate: string;
}
