package com.xebia.hackathon.spicepad.domain;

public class UserResponse {

    Integer id;
    Integer flightDateId;
    String displayName;

    public Integer getId() {
        return id;
    }

    public Integer getFlightDateId() {
        return flightDateId;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setFlightDateId(Integer flightDateId) {
        this.flightDateId = flightDateId;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}
