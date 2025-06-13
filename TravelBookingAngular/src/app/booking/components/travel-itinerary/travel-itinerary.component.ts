import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { HotelBooking } from '../../model/hotelBooking.model';
import { HotelBookingService } from '../../service/hotel-booking.service';
import { finalize } from 'rxjs';
import { Trip } from '../../model/trip.model';

@Component({
  selector: 'app-travel-itinerary',
  templateUrl: './travel-itinerary.component.html',
  styleUrl: './travel-itinerary.component.scss',
})
export class TravelItineraryComponent implements OnChanges {
  @Input() trip: Trip | null = null;
  hotelBookings: HotelBooking[] = [];
  isLoading = false;

  constructor(private hotelService: HotelBookingService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trip'] && this.trip) {
      this.loadHotelBookings();
    }
  }

  loadHotelBookings(): void {
    if (!this.trip) return;

    this.isLoading = true;
    this.hotelService
      .getHotelsForTrip(this.trip.id)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (data) => (this.hotelBookings = data),
        error: (err) => console.error('Failed to load hotels:', err),
      });
  }
}
