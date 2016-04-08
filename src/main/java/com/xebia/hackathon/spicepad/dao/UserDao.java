package com.xebia.hackathon.spicepad.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.xebia.hackathon.spicepad.model.User;

@Repository
public interface UserDao extends JpaRepository<User, Long>{

}
