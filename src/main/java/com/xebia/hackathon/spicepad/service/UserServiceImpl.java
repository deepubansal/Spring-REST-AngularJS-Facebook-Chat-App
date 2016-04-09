package com.xebia.hackathon.spicepad.service;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.xebia.hackathon.spicepad.dao.FlightDateDao;
import com.xebia.hackathon.spicepad.dao.UserDao;
import com.xebia.hackathon.spicepad.domain.RegisterRequest;
import com.xebia.hackathon.spicepad.domain.UserResponse;
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
	public UserResponse registerUser(RegisterRequest registerRequest) {
		logger.info("Inside UserServiceImpl");
		String flightNo = registerRequest.getFlightNo();
		Date date = registerRequest.getDate();
		User user = new User();
		user.setDisplayName(registerRequest.getDisplayName());
		user.setFbUserId(registerRequest.getFacebookUserId());
		user.setPnr(registerRequest.getPnr());
		FlightDate flightDate = findOrCreateFlightDateIfNotExists(flightNo, date);
		user.setFlightDate(flightDate);
		user = userDao.save(user);
		UserResponse userResponse = new UserResponse();
		userResponse.setFlightDateId(flightDate.getId());
		userResponse.setId(user.getId());
		userResponse.getDisplayName();
		return userResponse;
	}

    /**
     * @param flightNo
     * @param date
     * @return
     */
    FlightDate findOrCreateFlightDateIfNotExists(String flightNo, Date date) {
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

    @Override
    public UserResponse getUser(String fbUserId) {
        List<User> users = userDao.findByFbUserId(fbUserId);
        if (users.size() > 0) {
            User user = users.get(0);
            UserResponse userResponse = new UserResponse();
            userResponse.setFlightDateId(user.getFlightDate().getId());
            userResponse.setId(user.getId());
            userResponse.setDisplayName(user.getDisplayName());
            return userResponse;
        }
        else {
            return null;
        }
    }


}
