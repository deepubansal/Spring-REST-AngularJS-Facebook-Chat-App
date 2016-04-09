package com.xebia.hackathon.spicepad.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.xebia.hackathon.spicepad.domain.RegisterRequest;
import com.xebia.hackathon.spicepad.domain.UserResponse;
import com.xebia.hackathon.spicepad.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	
	private static Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(produces="application/json", consumes = "application/json", value="/new", method = RequestMethod.POST)
	public UserResponse  storeUser(@RequestBody RegisterRequest registerRequest) {
		logger.debug("Received registerRequest: " + registerRequest);
		UserResponse registeredUser = userService.registerUser(registerRequest);
		return registeredUser;
	}

    @RequestMapping(produces="application/json", value="/get", method = RequestMethod.GET)
    public UserResponse  getUser(@RequestParam("fbUserId") String fbUserId) {
        logger.debug("Received get user Request: " + fbUserId);
        UserResponse registeredUser = userService.getUser(fbUserId);
        return registeredUser;
    }

}
