package com.substring.chat.chat_app_backend.repositories;

import com.substring.chat.chat_app_backend.entity.Room;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepositories extends MongoRepository<Room,String> {
    Room findByRoomId(String roomId);
}
