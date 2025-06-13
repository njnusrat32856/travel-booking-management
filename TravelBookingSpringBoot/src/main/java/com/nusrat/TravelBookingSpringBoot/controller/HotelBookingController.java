package com.nusrat.TravelBookingSpringBoot.controller;

import com.nusrat.TravelBookingSpringBoot.entity.HotelBooking;
import com.nusrat.TravelBookingSpringBoot.service.HotelBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips/{tripId}/hotels")
@CrossOrigin(origins = "http://localhost:4200")
public class HotelBookingController {

    @Autowired
    private HotelBookingService hotelBookingService;

    @PostMapping
    public HotelBooking createHotelBooking(@PathVariable Long tripId, @RequestBody HotelBooking hotelBooking) {
        hotelBooking.setTripId(tripId);
        return hotelBookingService.save(hotelBooking);
    }

    @GetMapping
    public List<HotelBooking> getHotelBookingsForTrip(@PathVariable Long tripId) {
        return hotelBookingService.findByTripId(tripId);
    }
}
