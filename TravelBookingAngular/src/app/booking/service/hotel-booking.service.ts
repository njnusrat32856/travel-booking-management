import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HotelBooking } from '../model/hotelBooking.model';

@Injectable({
  providedIn: 'root',
})
export class HotelBookingService {
  private apiUrl = 'http://localhost:8080/api/trips';

  constructor(private http: HttpClient) {}

  getHotelsForTrip(tripId: number): Observable<HotelBooking[]> {
    return this.http.get<HotelBooking[]>(`${this.apiUrl}/${tripId}/hotels`);
  }

  createHotelBooking(
    tripId: number,
    hotelBooking: Omit<HotelBooking, 'id' | 'tripId'>
  ): Observable<HotelBooking> {
    return this.http.post<HotelBooking>(
      `${this.apiUrl}/${tripId}/hotels`,
      hotelBooking
    );
  }
}
