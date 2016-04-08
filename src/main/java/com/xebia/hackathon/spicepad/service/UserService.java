package com.xebia.hackathon.spicepad.service;

import com.xebia.hackathon.spicepad.domain.RegisterRequest;

public interface UserService {

    public abstract void registerUser(RegisterRequest registerRequest);
}