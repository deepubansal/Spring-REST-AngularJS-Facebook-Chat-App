package com.xebia.hackathon.spicepad.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.xebia.hackathon.spicepad.model.ChatMessage;

@Repository
public interface ChatDao extends JpaRepository<ChatMessage, Integer>{
    public List<ChatMessage> findTop10ByOrderByIdDesc();
}
