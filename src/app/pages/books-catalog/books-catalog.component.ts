import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import {MatGridListModule} from '@angular/material/grid-list';

import { BookCardComponent } from '../../components/book-card/book-card.component';
import { IBook } from '../../interfaces/book.interface';

@Component({
  selector: 'app-books-catalog',
  standalone: true,
  imports: [NgFor, NgIf , BookCardComponent, MatGridListModule],
  templateUrl: './books-catalog.component.html',
  styleUrl: './books-catalog.component.css'
})

export class BooksCatalogComponent implements OnInit, OnChanges{
  @Input("booksList") booksList: IBook[] = [];
    
  @Output() addBookToCart: EventEmitter<IBook> = new EventEmitter;
  @Output() deleteFromBooksList: EventEmitter<void> = new EventEmitter;


  ngOnInit(){
    this.booksList = JSON.parse(localStorage.getItem("booksList") || "[]");
  }

  ngOnChanges(changes: SimpleChanges): void {
    localStorage.setItem("booksList", JSON.stringify(this.booksList));
  }

  warnAboutAddBookToCart(book: IBook){
    this.addBookToCart.emit(book);
  }
}
