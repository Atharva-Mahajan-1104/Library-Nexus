package com.atharva.spring_boot_liabrary.service;

import com.atharva.spring_boot_liabrary.dao.MessageRepository;
import com.atharva.spring_boot_liabrary.entity.Message;
import com.atharva.spring_boot_liabrary.requestmodels.AdminQuestionRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

// Marks this class as a service layer component
@Service

// Ensures all database operations are executed within a transaction
@Transactional
public class MessagesService {

    // Repository used for interacting with Message entities
    private MessageRepository messageRepository;

    // Constructor-based dependency injection
    @Autowired
    public MessagesService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    // Saves a new message submitted by a user
    public void postMessage(Message messageRequest, String userEmail) {

        // Create a new Message entity using title and question
        Message message = new Message(
                messageRequest.getTitle(),
                messageRequest.getQuestion()
        );

        // Associate the message with the user's email
        message.setUserEmail(userEmail);

        // Persist the message in the database
        messageRepository.save(message);
    }

    // Updates an existing message with an admin response
    public void putMessage(AdminQuestionRequest adminQuestionRequest, String userEmail)
            throws Exception {

        // Fetch the message using the provided message ID
        Optional<Message> message =
                messageRepository.findById(adminQuestionRequest.getId());

        // Throw an exception if the message does not exist
        if (!message.isPresent()) {
            throw new Exception("Message not found");
        }

        // Set admin response details
        message.get().setAdminEmail(userEmail);
        message.get().setResponse(adminQuestionRequest.getResponse());

        // Mark the message as closed after admin reply
        message.get().setClosed(true);

        // Save the updated message
        messageRepository.save(message.get());
    }
}
