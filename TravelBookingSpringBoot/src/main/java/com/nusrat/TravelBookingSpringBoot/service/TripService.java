package com.nusrat.TravelBookingSpringBoot.service;

import com.nusrat.TravelBookingSpringBoot.entity.Trip;
import com.nusrat.TravelBookingSpringBoot.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TripService {

    @Autowired
    private TripRepository tripRepository;

    public List<Trip> findAll() {
        return tripRepository.findAll();
    }

    public Optional<Trip> findById(Long id) {
        return tripRepository.findById(id);
    }

    public Trip save(Trip trip) {
        return tripRepository.save(trip);
    }

    public void deleteById(Long id) {
        tripRepository.deleteById(id);
    }
}
