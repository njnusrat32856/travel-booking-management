package com.nusrat.TravelBookingSpringBoot.service;

import com.nusrat.TravelBookingSpringBoot.entity.HotelBooking;
import com.nusrat.TravelBookingSpringBoot.repository.HotelBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelBookingService {

    @Autowired
    private HotelBookingRepository hotelBookingRepository;

    public List<HotelBooking> findByTripId(Long tripId) {
        return hotelBookingRepository.findByTripId(tripId);
    }

    public HotelBooking save(HotelBooking hotelBooking) {
        return hotelBookingRepository.save(hotelBooking);
    }
}
