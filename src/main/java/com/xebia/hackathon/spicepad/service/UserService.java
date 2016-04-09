package com.xebia.hackathon.spicepad.service;

import com.xebia.hackathon.spicepad.domain.RegisterRequest;
import com.xebia.hackathon.spicepad.domain.UserResponse;

public interface UserService {

    public abstract UserResponse registerUser(RegisterRequest registerRequest);
}