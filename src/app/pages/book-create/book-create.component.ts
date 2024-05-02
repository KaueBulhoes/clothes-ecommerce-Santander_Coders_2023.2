import { Component, OnInit } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { IBook } from '../../interfaces/book.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-book-create',
    standalone: true,
    imports: [MatFormFieldModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule, ReactiveFormsModule],
    providers: [provideNativeDateAdapter()],
    templateUrl: './book-create.component.html',
    styleUrl: './book-create.component.css'
})

export class BookCreateComponent implements OnInit {
    booksList: IBook[] = [];
    bookForm: FormGroup;

    constructor() {
        this.bookForm = new FormGroup({
            id: new FormControl(),
            title: new FormControl(),
            photo: new FormControl(),
            description: new FormControl(),
            pullished_date: new FormControl(),
            price: new FormControl(),
            totalInStock: new FormControl()
        });
    }

    ngOnInit() {
        this.booksList = JSON.parse(localStorage.getItem("booksList") || "[]")
    }

    submitForm() {
        const newBook: IBook = this.bookForm.value;
        this.booksList.push(newBook);
        localStorage.setItem("booksList", JSON.stringify(this.booksList));
        this.bookForm.reset();
    }
}
