package com.atharva.spring_boot_liabrary.responsemodels;

import com.atharva.spring_boot_liabrary.entity.Book;
import lombok.Data;

@Data
public class ShelfCurrentLoansResponse {
    private Book book;
    private int daysLeft;

    public ShelfCurrentLoansResponse(Book book, int daysLeft) {
        this.book = book;
        this.daysLeft = daysLeft;
    }
}
