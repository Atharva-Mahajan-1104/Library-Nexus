package com.atharva.spring_boot_liabrary.controller;

import com.atharva.spring_boot_liabrary.requestmodels.AddBookRequest;
import com.atharva.spring_boot_liabrary.service.AdminService;
import com.atharva.spring_boot_liabrary.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// Allow requests from the frontend running on localhost:3000
@CrossOrigin("http://localhost:3000")

// Marks this class as a REST controller
@RestController

// Base URL mapping for all admin-related endpoints
@RequestMapping("/api/admin")
public class AdminController {

    // Service layer dependency for admin operations
    private AdminService adminService;

    // Constructor-based dependency injection
    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // Endpoint to add a new book (admin-only access)
    @PostMapping("/secure/add/book")
    public void postBook(
            @RequestHeader(value = "Authorization") String token,
            @RequestBody AddBookRequest addBookRequest) throws Exception {

        // Extract user type from JWT token
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");

        // Allow access only if the user is an admin
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only");
        }

        // Delegate the request to the service layer
        adminService.postBook(addBookRequest);
    }

    // Endpoint to increase the quantity of a specific book
    @PutMapping("/secure/increase/book/quantity")
    public void increaseBookQuantity(
            @RequestHeader(value = "Authorization") String token,
            @RequestParam Long bookId) throws Exception {

        // Validate admin access using JWT
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only");
        }

        // Increase book quantity
        adminService.increaseBookQuantity(bookId);
    }

    // Endpoint to decrease the quantity of a specific book
    @PutMapping("/secure/decrease/book/quantity")
    public void decreaseBookQuantity(
            @RequestHeader(value = "Authorization") String token,
            @RequestParam Long bookId) throws Exception {

        // Validate admin access using JWT
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only");
        }

        // Decrease book quantity
        adminService.decreaseBookQuantity(bookId);
    }

    // Endpoint to delete a book from the system
    @DeleteMapping("/secure/delete/book")
    public void deleteBook(
            @RequestHeader(value = "Authorization") String token,
            @RequestParam Long bookId) throws Exception {

        // Validate admin access using JWT
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only");
        }

        // Delete the book
        adminService.deleteBook(bookId);
    }
}
