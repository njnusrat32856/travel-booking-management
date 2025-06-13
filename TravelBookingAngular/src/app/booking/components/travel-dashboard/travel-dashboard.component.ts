import { Component, OnInit } from '@angular/core';
import { Trip } from '../../model/trip.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripService } from '../../service/trip.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotelBookingModalComponent } from '../hotel-booking-modal/hotel-booking-modal.component';

@Component({
  selector: 'app-travel-dashboard',
  templateUrl: './travel-dashboard.component.html',
  styleUrl: './travel-dashboard.component.scss',
})
export class TravelDashboardComponent implements OnInit {
  trips: Trip[] = [];
  selectedTrip: Trip | null = null;
  tripForm!: FormGroup;

  barChartData: any[] = [];
  lineChartData: any[] = [];

  constructor(
    private tripService: TripService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.initTripForm();
    this.loadTrips();
  }

  initTripForm(): void {
    this.tripForm = this.fb.group({
      customerName: ['', Validators.required],
      destination: ['Paris', Validators.required],
      departureDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      travelClass: ['Economy', Validators.required],
      passengers: [1, [Validators.required, Validators.min(1)]],
    });
  }

  loadTrips(): void {
    this.tripService.getAllTrips().subscribe({
      next: (data) => {
        this.trips = data;
        this.updateCharts();
      },
      error: (err) => console.error('Failed to load trips:', err),
    });
  }

  onTripSubmit(): void {
    if (this.tripForm.invalid) {
      return;
    }
    this.tripService.createTrip(this.tripForm.value).subscribe({
      next: () => {
        this.loadTrips(); 
        this.tripForm.reset({
          destination: 'Paris',
          travelClass: 'Economy',
          passengers: 1,
        });
      },
      error: (err) => console.error('Failed to create trip:', err),
    });
  }

  onViewItinerary(trip: Trip): void {
    this.selectedTrip = trip;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onAddHotel(trip: Trip): void {
    const modalRef = this.modalService.open(HotelBookingModalComponent);
    modalRef.componentInstance.tripId = trip.id;
    modalRef.componentInstance.tripDepartureDate = trip.departureDate;
    modalRef.componentInstance.tripReturnDate = trip.returnDate;

    modalRef.result.then(
      (result) => {
        console.log('Hotel booking created:', result);
        if (this.selectedTrip && this.selectedTrip.id === trip.id) {
          const currentTrip = this.selectedTrip;
          this.selectedTrip = null; // Deselect
          setTimeout(() => (this.selectedTrip = currentTrip), 0);
        }
      },
      (reason) => {
        console.log(`Dismissed: ${reason}`);
      }
    );
  }

  onDeleteTrip(tripId: number): void {
    if (confirm('Are you sure you want to delete this trip?')) {
      this.tripService.deleteTrip(tripId).subscribe({
        next: () => {
          this.loadTrips();
          if (this.selectedTrip && this.selectedTrip.id === tripId) {
            this.selectedTrip = null;
          }
        },
        error: (err) => console.error('Failed to delete trip:', err),
      });
    }
  }

  updateCharts(): void {
    const destinationCounts: { [key: string]: number } = {};
    this.trips.forEach((trip) => {
      destinationCounts[trip.destination] =
        (destinationCounts[trip.destination] || 0) + 1;
    });
    this.barChartData = Object.keys(destinationCounts).map((name) => ({
      name,
      value: destinationCounts[name],
    }));

    const monthCounts: { [key: string]: number } = {};
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    this.trips.forEach((trip) => {
      const month = new Date(trip.departureDate).getMonth();
      const monthName = monthNames[month];
      monthCounts[monthName] = (monthCounts[monthName] || 0) + 1;
    });
    const series = monthNames.map((name) => ({
      name,
      value: monthCounts[name] || 0,
    }));
    this.lineChartData = [{ name: 'Bookings', series }];
  }
}
