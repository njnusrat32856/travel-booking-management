package com.nusrat.TravelBookingSpringBoot.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class HotelBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long tripId; // Link to the Trip entity
    private String hotelName;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private String roomType;
    private BigDecimal totalCost;

    @Override
    public String toString() {
        return "HotelBooking{" +
                "id=" + id +
                ", tripId=" + tripId +
                ", hotelName='" + hotelName + '\'' +
                ", checkIn=" + checkIn +
                ", checkOut=" + checkOut +
                ", roomType='" + roomType + '\'' +
                ", totalCost=" + totalCost +
                '}';
    }

    public HotelBooking() {
    }

    public HotelBooking(Long id, Long tripId, String hotelName, LocalDate checkIn, LocalDate checkOut, String roomType, BigDecimal totalCost) {
        this.id = id;
        this.tripId = tripId;
        this.hotelName = hotelName;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.roomType = roomType;
        this.totalCost = totalCost;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTripId() {
        return tripId;
    }

    public void setTripId(Long tripId) {
        this.tripId = tripId;
    }

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public LocalDate getCheckIn() {
        return checkIn;
    }

    public void setCheckIn(LocalDate checkIn) {
        this.checkIn = checkIn;
    }

    public LocalDate getCheckOut() {
        return checkOut;
    }

    public void setCheckOut(LocalDate checkOut) {
        this.checkOut = checkOut;
    }

    public String getRoomType() {
        return roomType;
    }

    public void setRoomType(String roomType) {
        this.roomType = roomType;
    }

    public BigDecimal getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(BigDecimal totalCost) {
        this.totalCost = totalCost;
    }
}
