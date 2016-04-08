package com.xebia.hackathon.spicepad.controller;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.xebia.hackathon.spicepad.domain.RegisterRequest;
import com.xebia.hackathon.spicepad.service.UserService;

@RestController
@RequestMapping("/register")
public class UserController {
	
	private static Logger logger = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	private UserService userService;
	
	@RequestMapping(produces="application/json", value="/new", method = RequestMethod.POST)
	public Boolean  storeGPS(@Valid RegisterRequest registerRequest) {
		logger.debug("Received registerRequest: " + registerRequest);
		userService.registerUser(registerRequest);
		return true;
	}
}
