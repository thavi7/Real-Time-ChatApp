package com.substring.chat.chat_app_backend.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Message {
    private String sender;
    private String content;
    private LocalDateTime timestamp;

    public Message(String content, String sender) {
        this.content = content;
        this.sender = sender;
        this.timestamp=LocalDateTime.now();
    }
}
