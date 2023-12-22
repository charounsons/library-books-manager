// src/app/components/book/book.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../interfaces/book.interface';
import { Credential } from '../../interfaces/credential.interface';
import { BookService } from '../../services/book/book.service';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from 'src/app/interfaces/decoded-token.interface';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UpdateBookModalComponent } from '../update-book-modal/update-book-modal.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  loggedIn: boolean = false;
  books: Book[] = [];
  bookForm: FormGroup;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  sortByColumn: string = '';
  sortAscending: boolean = true;
  searchForm: FormGroup;
  searchResults: Book[] = [];
  localStorage: Storage;
  toastr: ToastrService;

  constructor(private bookService: BookService, private fb: FormBuilder, toastr: ToastrService, private modalService: NgbModal) {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      author: ['', [Validators.required, Validators.maxLength(255)]],
    });

    this.searchForm = this.fb.group({
      search: [''],
    });

    this.toastr = toastr;
    this.localStorage = localStorage;
  }

  ngOnInit(): void {
    // Check if the user is already logged in on component initialization
    this.checkLoginStatus();
    // Fetch the list of books when the application loads
    this.getBooks();
  }

  toggleLogin() {
    if (this.isLoggedIn()) {
      this.logout();
    } else {
      this.login();
    }
  }

  login() {
    const userCredentials: Credential = {
      username: 'fake_username',
      password: 'fake_password'
    };

    this.bookService.login(userCredentials).subscribe({
      next: (response: any) => {
        // Store the access token in local storage
        localStorage.setItem('accessToken', response.access_token);
        // Check the login status again
        this.checkLoginStatus();
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.toastr.error(`Failed to login. Please check your credentials and try again: ${error}`, 'Error');
      },
      complete: () => this.toastr.success('Logged in successfully!', 'Success')
    });
  }

  logout() {
    // Clear the access token from local storage
    localStorage.removeItem('accessToken');
    // Check the login status again
    this.checkLoginStatus();
    this.toastr.success('Logged out successfully!', 'Success')
  }

  isLoggedIn(): boolean {
    // Check if the access token is present and not expired
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return false;
    }

    const decodedToken: DecodedToken = jwtDecode(accessToken);

    // Check if the token is expired
    const isTokenExpired = decodedToken.exp * 1000 < Date.now();
    return !isTokenExpired;
  }

  checkLoginStatus() {
    this.loggedIn = this.isLoggedIn();

    // Disable form controls and buttons if the user is not logged in
    if (!this.loggedIn) {
      this.bookForm.disable();
    } else {
      this.bookForm.enable();
    }
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe((books) => (this.books = books));
  }

  addBook(): void {
    if (this.loggedIn) {
      // Mark all fields as touched to trigger error messages
      this.bookForm.markAllAsTouched();
      if (this.bookForm.valid) {
        const newBook: Book = this.bookForm.value;
        this.bookService.addBook(newBook).subscribe({
          next: () => {
            // Update the list of books
            this.getBooks();

            // Clear the form input fields
            this.bookForm.reset();

            // Show a success toast notification
            this.toastr.success('Book added successfully!', 'Success');
          },
          error: (error) => {
            // Handle error and show an error toast if necessary
            console.error('Failed to add book:', error);
            this.toastr.error('Failed to add book. Please try again.', 'Error');
          },
        });
      } else {
        // Form is invalid, show error toastr
        this.toastr.error('Please fill out all required fields', 'Error');
      }
    } else {
      // User is not authenticated, show error toastr
      this.toastr.error('Please login to add a book', 'Error');
    }
  }

  updateBook(id: string): void {
    if (this.loggedIn) {
      this.bookService.getBook(id).subscribe({
        next: (book: Book) => {
          if (book) {
            // Open the modal with the book details only if the book is defined
            const modalRef = this.modalService.open(UpdateBookModalComponent);
            modalRef.componentInstance.book = book;

            // Subscribe to the modal's result
            modalRef.result.then((result: Book) => {
              if (result) {
                // Update the list of books
                this.getBooks(); // Fetch the most recent list

                // Show a success toast notification
                this.toastr.success('Book updated successfully!', 'Success');
              } else {
                // User canceled, show a cancellation toast
                this.toastr.info('Update canceled', 'Info');
              }
            }).catch(() => {
              // Modal dismissed, show a dismissal toast
              this.toastr.info('Update dismissed', 'Info');
            });
          }
        },
        error: (error) => {
          console.error('Failed to fetch book details:', error);
          this.toastr.error('Failed to fetch book details. Please try again.', 'Error');
        },
      });
    } else {
      // User is not authenticated, show error toastr
      this.toastr.error('Please login to update books', 'Error');
    }
  }

  deleteBook(id: string): void {
    if (this.loggedIn) {
      this.bookService.deleteBook(id).subscribe(() => this.getBooks());
      this.toastr.success('Book deleted successfully!', 'Success');
    } else {
      // User is not authenticated, show error toastr
      this.toastr.error('Please login to delete books', 'Error');
    }
  }

  pageChanged(newPageNumber: number): void {
    this.currentPage = newPageNumber;
  }

  sortColumn(column: string): void {
    if (this.sortByColumn === column) {
      // If clicking on the same column, reverse the sorting order
      this.sortAscending = !this.sortAscending;
      this.books.reverse();
    } else {
      // Update the sortByColumn and sort the books accordingly
      this.sortByColumn = column;
      this.sortAscending = true; // Default to ascending order
      this.sortBooks();
    }
  }

  // Method to handle sorting of books
  sortBooks(): void {
    switch (this.sortByColumn) {
      case 'title':
        this.books.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'author':
        this.books.sort((a, b) => a.author.localeCompare(b.author));
        break;
      case 'createdAt':
        this.books.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      default:
        // Default to sorting by createdAt
        this.books.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
    }
  }

  searchBooks(): void {
    const searchTerm = this.searchForm.get('search').value.toLowerCase();
    // Filter books based on the search term
    this.searchResults = this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm)
    );
  }

  // searchBooks(): void {
  // const searchTerm = this.searchForm.get('search').value.trim().toLowerCase();

  // if (!searchTerm) {
  //   // If the search term is empty, reset the book list to the original state
  //   this.getBooks();
  //   return;
  // }

  // Escape special characters in the search term
  // const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Create a regex pattern to match at least two characters in any order
  // const regexPattern = new RegExp(escapedSearchTerm.split('').join('.*'), 'i');

  // Create a regex pattern to match at least three characters in any order
  // const regexPattern = new RegExp(escapedSearchTerm.split('').join('.{0,1}'), 'i');

  // Filter books based on the regex pattern
  // this.books = this.books.filter((book) =>
  //   regexPattern.test(book.title.toLowerCase()) ||
  //   regexPattern.test(book.author.toLowerCase())
  // );
  // }

  resetSearchResults(): void {
    // Clear the search term and search results
    this.searchForm.get('search').setValue('');
    this.searchResults = [];
  }
}
