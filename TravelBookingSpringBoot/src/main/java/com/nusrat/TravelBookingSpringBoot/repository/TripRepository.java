package com.nusrat.TravelBookingSpringBoot.repository;

import com.nusrat.TravelBookingSpringBoot.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {
}
