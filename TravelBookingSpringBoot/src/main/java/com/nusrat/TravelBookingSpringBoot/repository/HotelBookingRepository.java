package com.nusrat.TravelBookingSpringBoot.repository;

import com.nusrat.TravelBookingSpringBoot.entity.HotelBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HotelBookingRepository extends JpaRepository<HotelBooking, Long> {
    List<HotelBooking> findByTripId(Long tripId);
}
