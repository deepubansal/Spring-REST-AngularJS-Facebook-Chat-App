package com.xebia.hackathon.spicepad.domain;

public class MessageRequest {

    String message;
    Integer flightDateId;
    Integer userId;
    
    public String getMessage() {
        return message;
    }
    public Integer getFlightDateId() {
        return flightDateId;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public void setFlightDateId(Integer flightDateId) {
        this.flightDateId = flightDateId;
    }
    public Integer getUserId() {
        return userId;
    }
    public void setUserId(Integer userId) {
        this.userId = userId;
    }
    
}
