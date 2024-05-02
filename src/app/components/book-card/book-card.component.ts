import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

import { IBook } from '../../interfaces/book.interface';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [NgIf, MatCardModule, MatIconModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css'
})

export class BookCardComponent implements OnInit {
  @Input() book ? : IBook; 

  @Output() addBookToCart: EventEmitter<void> = new EventEmitter;

  addedBooksList: IBook[] = [];
  booksList: IBook[] = [];

  ngOnInit(){
    this.addedBooksList = JSON.parse(localStorage.getItem("addedBooksList") || "[]");
    this.booksList = JSON.parse(localStorage.getItem("booksList") || "[]");
  }

  addToShoppingCart(){
    this.addBookToCart.emit();
    
    localStorage.setItem("addedBooksList", JSON.stringify(this.addedBooksList))
  }

  findOrDeleteBook(book?: IBook){
    const bookIndex = this.booksList.findIndex((currBook) => {
      return currBook.id === book?.id;
    })
    this.booksList.splice(bookIndex, 1);
}

  deleteFromBooksList(book: IBook){
    this.findOrDeleteBook(book);
    this.booksList = [...this.booksList];
    localStorage.setItem("booksList", JSON.stringify(this.booksList))
  }

}
