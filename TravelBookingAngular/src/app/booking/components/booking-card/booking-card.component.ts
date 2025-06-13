import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Trip } from '../../model/trip.model';

@Component({
  selector: 'app-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrl: './booking-card.component.scss',
})
export class BookingCardComponent {
  @Input() trip!: Trip;
  @Input() isSelected: boolean = false;
  @Output() viewItinerary = new EventEmitter<Trip>();
  @Output() addHotel = new EventEmitter<Trip>();
  @Output() delete = new EventEmitter<number>();

  onViewItinerary(): void {
    this.viewItinerary.emit(this.trip);
  }

  onAddHotel(): void {
    this.addHotel.emit(this.trip);
  }

  onDelete(): void {
    this.delete.emit(this.trip.id);
  }
}
