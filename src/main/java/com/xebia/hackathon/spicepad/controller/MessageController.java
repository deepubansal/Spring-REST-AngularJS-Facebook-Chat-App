package com.xebia.hackathon.spicepad.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.xebia.hackathon.spicepad.domain.MessageRequest;
import com.xebia.hackathon.spicepad.domain.MessageResponse;
import com.xebia.hackathon.spicepad.service.MessageService;

@RestController
@RequestMapping("/message")
public class MessageController {
	
	private static Logger logger = LoggerFactory.getLogger(MessageController.class);
	@Autowired
	private MessageService messageService;
	
	@RequestMapping(produces="application/json", consumes = "application/json", value="/new", method = RequestMethod.POST)
	public Boolean  addMessage(@RequestBody MessageRequest messageRequest) {
		logger.debug("Received registerRequest: " + messageRequest);
		messageService.addMessage(messageRequest);
		return true;
	}

	@RequestMapping(produces="application/json", value="/get", method = RequestMethod.GET)
	public List<MessageResponse>  topTen(@RequestParam(value="flightDateId") Integer flightDateId) {
	    logger.debug("Received get request: " + flightDateId);
	    List<MessageResponse> messageResponse = messageService.findTopMessages(flightDateId);
        return messageResponse;
	}
	
}
