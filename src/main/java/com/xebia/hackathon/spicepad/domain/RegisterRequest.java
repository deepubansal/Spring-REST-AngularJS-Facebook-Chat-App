package com.xebia.hackathon.spicepad.domain;

import org.joda.time.LocalDate;
import org.springframework.format.annotation.DateTimeFormat;

public class RegisterRequest {
    
    String flightNo;
    String pnr;
    String facebookUserId;
    String displayName;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate date;
    
    public String getFlightNo() {
        return flightNo;
    }
    public String getPnr() {
        return pnr;
    }
    public String getFacebookUserId() {
        return facebookUserId;
    }
    public String getDisplayName() {
        return displayName;
    }
    public void setFlightNo(String flightNo) {
        this.flightNo = flightNo;
    }
    public void setPnr(String pnr) {
        this.pnr = pnr;
    }
    public void setFacebookUserId(String facebookUserId) {
        this.facebookUserId = facebookUserId;
    }
    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
    
    
}
