import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelBookingService } from '../../service/hotel-booking.service';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hotel-booking-modal',
  templateUrl: './hotel-booking-modal.component.html',
  styleUrl: './hotel-booking-modal.component.scss'
})
export class HotelBookingModalComponent implements OnInit {
  @Input() tripId!: number;
  @Input() tripDepartureDate!: string;
  @Input() tripReturnDate!: string;

  hotelForm!: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private hotelService: HotelBookingService
  ) {}

  ngOnInit(): void {
    this.hotelForm = this.fb.group({
      hotelName: ['', Validators.required],
      checkIn: [this.tripDepartureDate, Validators.required],
      checkOut: [this.tripReturnDate, Validators.required],
      roomType: ['Standard', Validators.required],
      totalCost: [null, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.hotelForm.invalid) {
      return;
    }
    this.hotelService.createHotelBooking(this.tripId, this.hotelForm.value).subscribe({
      next: (newHotelBooking) => {
        this.activeModal.close(newHotelBooking);
      },
      error: (err) => console.error('Failed to create hotel booking:', err)
    });
  }
}