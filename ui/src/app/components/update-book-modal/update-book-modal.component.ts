// update-book-modal.component.ts

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from '../../interfaces/book.interface';
import { BookService } from '../../services/book/book.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-book-modal',
  templateUrl: './update-book-modal.component.html',
  styleUrls: ['./update-book-modal.component.css'],
})
export class UpdateBookModalComponent {
  @Input() book: Book; // Input property to receive the book details
  @Output() update = new EventEmitter<Book>(); // Output event emitter to send the updated book to the parent component

  updateForm: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private bookService: BookService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
    });

    // Check if this.book is defined before accessing its properties
    if (this.book) {
      this.updateForm.patchValue({
        title: this.book.title,
        author: this.book.author,
      });
    }
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const updatedBook: Book = {
        _id: this.book._id,
        title: this.updateForm.value.title,
        author: this.updateForm.value.author,
      };

      this.bookService.updateBook(updatedBook._id, updatedBook).subscribe({
        next: () => {
          // Emit the updated book to the parent component
          this.update.emit(updatedBook);
          // Close the modal
          this.activeModal.close(updatedBook);
        },
        error: (error) => {
          console.error('Failed to update book:', error);
          // Show an error toast notification
          this.toastr.error('Failed to update book. Please try again.', 'Error');
        },
      });
    } else {
      // Form is invalid, show an error toast
      this.toastr.error('Please fill out all required fields', 'Error');
    }
  }

  onCancel(): void {
    // Close the modal without updating
    this.activeModal.dismiss('Canceled');
  }
}
