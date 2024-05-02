import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

import { HeaderComponent } from './components/header/header.component';
import { BooksCatalogComponent } from './pages/books-catalog/books-catalog.component';
import { BooksCartComponent } from './components/books-cart/books-cart.component';
import { BookCreateComponent } from './pages/book-create/book-create.component';

import { IBook } from './interfaces/book.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BooksCatalogComponent, MatSidenavModule, BooksCartComponent, MatIconModule, BookCreateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit, OnChanges {
  addedBooksList: IBook[] = [];

  ngOnInit() {
    this.addedBooksList = JSON.parse(localStorage.getItem("addedBooksList") || "[]");
  }

  ngOnChanges(changes: SimpleChanges): void {
    localStorage.setItem("addedBooksList", JSON.stringify(this.addedBooksList));
  }

  findOrAddBook(book: IBook) {
    // Checando se o livro que estou buscando já está no carrinho
    for (let i=0; i<this.addedBooksList.length; i++) {
      const currBook = this.addedBooksList[i];
      if (book.id === currBook.id) {
        currBook.totalAddedToCart = (book.totalAddedToCart < book.totalInStock)? currBook.totalAddedToCart + 1 : currBook.totalAddedToCart;
        return;
      }
    }

    // Adicionando uma cópia de um novo livro ao carrinho
    book.totalAddedToCart = 1;
    this.addedBooksList.push(book);
  }

  addBookToCart(book: IBook) {
    this.findOrAddBook(book);
    this.addedBooksList = [...this.addedBooksList];
  }
}