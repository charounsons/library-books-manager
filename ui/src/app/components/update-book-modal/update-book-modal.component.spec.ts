import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBookModalComponent } from './update-book-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from 'src/app/services/book/book.service';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('UpdateBookModalComponent', () => {
  let component: UpdateBookModalComponent;
  let fixture: ComponentFixture<UpdateBookModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateBookModalComponent],
      imports: [HttpClientModule, HttpClientTestingModule, ToastrModule, ToastrModule.forRoot(), FormsModule, ReactiveFormsModule],
      providers: [NgbActiveModal, BookService, ToastrService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(UpdateBookModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const service: BookService = TestBed.inject(BookService);
    expect(service).toBeTruthy();
  });
});
