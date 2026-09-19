package com.substring.chat.chat_app_backend.controllers;


import com.substring.chat.chat_app_backend.entity.Message;
import com.substring.chat.chat_app_backend.entity.Room;
import com.substring.chat.chat_app_backend.repositories.RoomRepositories;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/rooms")
public class RoomController {

    private final RoomRepositories roomRepositories;

    //create room
    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody String roomid){
        if(roomRepositories.findByRoomId(roomid)==null){
            Room room=new Room();
            room.setRoomId(roomid);
            roomRepositories.save(room);
            return ResponseEntity.status(HttpStatus.CREATED).body(room);
        }else{
            return ResponseEntity.badRequest().body("Room already Exists! ");
        }
    }

    @GetMapping("/{roomid}")
    public ResponseEntity<?>joinRoom(@PathVariable String roomid){
        Room room=roomRepositories.findByRoomId(roomid);
        if(room==null){
            return ResponseEntity.badRequest().body("Room doesn't Exists! ");
        }else{
            return ResponseEntity.ok(room);
        }
    }


    //get msg of rooom
    @GetMapping("/{roomid}/messages")
    public ResponseEntity<List<Message>> getMessages(@PathVariable String roomid,
            @RequestParam(value = "page",defaultValue = "0",required = false) int page,
            @RequestParam(value = "size",defaultValue = "20",required = false) int size
                ){
        Room room=roomRepositories.findByRoomId(roomid);
        if(room==null){
            return ResponseEntity.badRequest().build();
        }else{
            List<Message> messages = room.getMessages();
            int st=Math.max(0,messages.size()-(page+1)*size);
            int end=Math.min(messages.size(),st+size);
            List<Message> messages1 = messages.subList(st, end);
            return ResponseEntity.ok(messages1);
        }
    }



}
