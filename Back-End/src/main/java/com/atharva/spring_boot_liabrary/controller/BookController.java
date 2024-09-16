package com.atharva.spring_boot_liabrary.controller;

import com.atharva.spring_boot_liabrary.entity.Book;
import com.atharva.spring_boot_liabrary.responsemodels.ShelfCurrentLoansResponse;
import com.atharva.spring_boot_liabrary.service.BookService;
import com.atharva.spring_boot_liabrary.utils.ExtractJWT;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {

    private final Logger logger = LoggerFactory.getLogger(BookController.class);
    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }




    @GetMapping("/secure/currentloans")
   public List<ShelfCurrentLoansResponse> currentLoans(@RequestHeader (value="Authorization")String token) throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token,"\"sub\"");
        return bookService.currentLoans(userEmail);
    }
    @PutMapping("/secure/checkout")
    public Book checkoutBook(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) throws Exception {
        logger.info("Received checkout request for bookId: {} with token: {}", bookId, token);
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        logger.info("Extracted userEmail: {}", userEmail);
        return bookService.checkoutBook(userEmail, bookId);
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutBookByUser(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) throws Exception {
        logger.info("Received isCheckedOut request for bookId: {} with token: {}", bookId, token);
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        logger.info("Extracted userEmail: {}", userEmail);
        return bookService.checkoutBookByUser(userEmail, bookId);
    }

    @GetMapping("/secure/currentloans/count")
    public int currentLoansCount(@RequestHeader(value = "Authorization") String token) {
        logger.info("Received currentLoansCount request with token: {}", token);
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        logger.info("Extracted userEmail: {}", userEmail);
        return bookService.currentLoansCount(userEmail);
    }

    @PutMapping("/secure/return")
    public void returnBook(@RequestHeader(value = "Authorization") String token, @RequestParam Long bookId) throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        bookService.returnBook(userEmail, bookId);
    }

    @PutMapping("/secure/renew/loan")
    public void renewLoan(@RequestHeader(value = "Authorization") String token,
                          @RequestParam Long bookId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        bookService.renewLoan(userEmail, bookId);
    }
}
