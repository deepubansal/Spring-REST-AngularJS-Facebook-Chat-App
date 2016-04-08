package com.xebia.hackathon.spicepad.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String message;
	
    @ManyToOne
    @JoinColumn(name = "USER_ID", nullable = false)
	private User user;

	@ManyToOne
	@JoinColumn(name = "FLIGHT_DATE_ID", nullable = false)
	private FlightDate flightDate;
	
	public Long getId() {
		return id;
	}

    public String getMessage() {
        return message;
    }

    public User getUser() {
        return user;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public FlightDate getFlightDate() {
        return flightDate;
    }

    public void setFlightDate(FlightDate flightDate) {
        this.flightDate = flightDate;
    }
	
}
