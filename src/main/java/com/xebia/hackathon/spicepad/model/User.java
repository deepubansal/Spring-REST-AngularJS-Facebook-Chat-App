package com.xebia.hackathon.spicepad.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class User {
    

    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;
    
    String displayName;
    String fbUserId;
    String pnr;
    
    @ManyToOne
    @JoinColumn(name = "FLIGHT_DATE_ID", nullable = false)
    FlightDate flightDate;
    
    public String getDisplayName() {
        return displayName;
    }
    public String getFbUserId() {
        return fbUserId;
    }
    public String getPnr() {
        return pnr;
    }
    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
    public void setFbUserId(String fbUserId) {
        this.fbUserId = fbUserId;
    }
    public void setPnr(String pnr) {
        this.pnr = pnr;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public FlightDate getFlightDate() {
        return flightDate;
    }
    public void setFlightDate(FlightDate flightDate) {
        this.flightDate = flightDate;
    }
}
