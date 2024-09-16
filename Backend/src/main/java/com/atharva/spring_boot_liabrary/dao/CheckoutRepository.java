package com.atharva.spring_boot_liabrary.dao;

import com.atharva.spring_boot_liabrary.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout,Long> {

    Checkout findBookByUserEmailAndBookId(String UserEmail,Long bookId);


    List<Checkout> findBooksByUserEmail(String userEmail);

    @Modifying
    @Query("delete from Checkout where book_id in :book_id")
    void deleteAllByBookId(@Param("book_id") Long bookId);
}
