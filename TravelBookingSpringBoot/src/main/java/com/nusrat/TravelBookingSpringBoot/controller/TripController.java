package com.nusrat.TravelBookingSpringBoot.controller;

import com.nusrat.TravelBookingSpringBoot.entity.Trip;
import com.nusrat.TravelBookingSpringBoot.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
@CrossOrigin(origins = "http://localhost:4200")
public class TripController {

    @Autowired
    private TripService tripService;

    @GetMapping
    public List<Trip> getAllTrips() {
        return tripService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trip> getTripById(@PathVariable Long id) {
        return tripService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Trip createTrip(@RequestBody Trip trip) {
        return tripService.save(trip);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trip> updateTrip(@PathVariable Long id, @RequestBody Trip tripDetails) {
        return tripService.findById(id)
                .map(trip -> {
                    trip.setCustomerName(tripDetails.getCustomerName());
                    trip.setDestination(tripDetails.getDestination());
                    trip.setDepartureDate(tripDetails.getDepartureDate());
                    trip.setReturnDate(tripDetails.getReturnDate());
                    trip.setTravelClass(tripDetails.getTravelClass());
                    trip.setPassengers(tripDetails.getPassengers());
                    return ResponseEntity.ok(tripService.save(trip));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrip(@PathVariable Long id) {
        tripService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
