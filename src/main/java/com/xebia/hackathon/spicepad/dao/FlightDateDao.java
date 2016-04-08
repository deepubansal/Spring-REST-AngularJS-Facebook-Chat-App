package com.xebia.hackathon.spicepad.dao;

import java.util.List;

import org.joda.time.LocalDate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.xebia.hackathon.spicepad.model.FlightDate;

@Repository
public interface FlightDateDao extends JpaRepository<FlightDate, Integer>{
    List<FlightDate> findByFlightNoAndDate(String flightNo, LocalDate date);
}
