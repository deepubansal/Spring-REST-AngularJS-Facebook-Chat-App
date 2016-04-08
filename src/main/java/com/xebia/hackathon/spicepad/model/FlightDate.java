package com.xebia.hackathon.spicepad.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import org.joda.time.LocalDate;

@Entity
public class FlightDate {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Integer id;
    String flightNo;
    LocalDate date;
    
    @OneToMany(mappedBy="flightDate")
    List<ChatMessage> messages = new ArrayList<>();
    
    public String getFlightNo() {
        return flightNo;
    }
    public LocalDate getDate() {
        return date;
    }
    public List<ChatMessage> getMessages() {
        return messages;
    }
    public void setFlightNo(String flightNo) {
        this.flightNo = flightNo;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
    public void setMessages(List<ChatMessage> messages) {
        this.messages = messages;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
}
