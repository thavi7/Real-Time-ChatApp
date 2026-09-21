package com.substring.chat.chat_app_backend.controllers;

import com.substring.chat.chat_app_backend.config.AppConstance;
import com.substring.chat.chat_app_backend.entity.Message;
import com.substring.chat.chat_app_backend.entity.Room;
import com.substring.chat.chat_app_backend.payload.MessageRequest;
import com.substring.chat.chat_app_backend.repositories.RoomRepositories;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@RestController
@CrossOrigin(AppConstance.FRONTEND_BASE_URL)
public class ChatController {
    private final RoomRepositories roomRepositories;

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Message sendMessage(
            @DestinationVariable String roomId,
            @RequestBody MessageRequest messageRequest
        ) throws Exception{
            Room room = roomRepositories.findByRoomId(messageRequest.getRoomId());

            Message message=new Message();
            message.setContent(messageRequest.getContent());
            message.setSender(messageRequest.getSender());
            message.setTimestamp(LocalDateTime.now());

            if(room!=null){
                room.getMessages().add(message);
                roomRepositories.save(room);
                return message;
            }else{
                throw new RuntimeException("Room not found !!");
            }
        }

}
