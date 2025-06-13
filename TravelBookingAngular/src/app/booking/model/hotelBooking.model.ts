export interface HotelBooking {
  id: number;
  tripId: number;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  totalCost: number;
}
