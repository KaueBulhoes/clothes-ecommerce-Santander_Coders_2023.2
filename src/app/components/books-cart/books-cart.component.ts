import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { IBook } from '../../interfaces/book.interface';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-books-cart',
  standalone: true,
  imports: [MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './books-cart.component.html',
  styleUrl: './books-cart.component.css'
})
export class BooksCartComponent implements OnChanges {
  @Input("booksList") addedBooksList: IBook[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    // localStorage.setItem("addedBooksList", JSON.stringify(this.addedBooksList));
  }

  removeBookFromCart(book: IBook) {
    const bookIndex = this.addedBooksList.findIndex((currBook) => {
      return currBook.id === book.id;
    })
    this.addedBooksList.splice(bookIndex, 1);
  }

  incrementTotalBookCopies(book: IBook) {
    book.totalAddedToCart++;
    if (book.totalAddedToCart > book.totalInStock) {
      book.totalAddedToCart = book.totalInStock;
    }
    localStorage.setItem("addedBooksList", JSON.stringify(this.addedBooksList))
  }

  decrementTotalBookCopies(book: IBook) {
    book.totalAddedToCart--;
    if (book.totalAddedToCart <= 0) {
      this.removeBookFromCart(book);
    }
    localStorage.setItem("addedBooksList", JSON.stringify(this.addedBooksList))
  }
}
