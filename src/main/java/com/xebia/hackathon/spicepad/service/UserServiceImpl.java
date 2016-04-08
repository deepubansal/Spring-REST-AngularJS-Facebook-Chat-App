package com.xebia.hackathon.spicepad.service;

import java.util.List;

import javax.transaction.Transactional;

import org.joda.time.LocalDate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.xebia.hackathon.spicepad.dao.FlightDateDao;
import com.xebia.hackathon.spicepad.dao.UserDao;
import com.xebia.hackathon.spicepad.domain.RegisterRequest;
import com.xebia.hackathon.spicepad.model.FlightDate;
import com.xebia.hackathon.spicepad.model.User;

@Component
public class UserServiceImpl implements UserService {

	private static Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	@Autowired
	private UserDao userDao;

    @Autowired
    private FlightDateDao flightDateDao;

    @Override
	@Transactional
	public void registerUser(RegisterRequest registerRequest) {
		logger.info("Inside UserServiceImpl");
		String flightNo = registerRequest.getFlightNo();
		LocalDate date = registerRequest.getDate();
		User user = new User();
		user.setDisplayName(registerRequest.getDisplayName());
		user.setFbUserId(registerRequest.getFacebookUserId());
		user.setPnr(registerRequest.getPnr());
		FlightDate flightDate = findOrCreateFlightDateIfNotExists(flightNo, date);
		user.setFlightDate(flightDate);
		user = userDao.save(user);
	}

    /**
     * @param flightNo
     * @param date
     * @return
     */
    FlightDate findOrCreateFlightDateIfNotExists(String flightNo, LocalDate date) {
        FlightDate flightDate;
		List<FlightDate> flightDates = flightDateDao.findByFlightNoAndDate(flightNo, date);
		if (flightDates.size() > 0) {
		    flightDate = flightDates.get(0);
		}
		else {
		   flightDate = new FlightDate();
		   flightDate.setDate(date);
		   flightDate.setFlightNo(flightNo);
		   flightDate = flightDateDao.save(flightDate);
		}
        return flightDate;
    }


}
