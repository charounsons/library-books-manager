// book.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { BookService } from '../../services/book/book.service';
import { BookComponent } from './book.component';
import { of } from 'rxjs';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let toastrServiceMock: jasmine.SpyObj<ToastrService>;
  let bookServiceMock: jasmine.SpyObj<BookService>;

  beforeEach(() => {
    toastrServiceMock = jasmine.createSpyObj('ToastrService', ['success', 'error', 'info']);

    bookServiceMock = jasmine.createSpyObj('BookService', ['login', 'addBook']);
    bookServiceMock.login.and.returnValue(of({}));
    bookServiceMock.addBook.and.returnValue(of({ author: 'James Joyce', title: 'Good Book' }));

    TestBed.configureTestingModule({
      declarations: [BookComponent],
      imports: [ReactiveFormsModule, NgxPaginationModule],
      providers: [
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: NgbModal, useValue: {} },
        { provide: BookService, useValue: bookServiceMock },
      ],
    });

    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty book list', () => {
    expect(component.books.length).toEqual(0);
  });

  it('should initialize with default values', () => {
    expect(component.loggedIn).toBeFalsy();
    expect(component.currentPage).toEqual(1);
    expect(component.itemsPerPage).toEqual(10);
    expect(component.sortByColumn).toEqual('');
    expect(component.sortAscending).toBeTruthy();
  });

  it('should toggle login status correctly', () => {
    // Initial state is not logged in
    expect(component.loggedIn).toBeFalsy();

    // Toggle login status
    component.toggleLogin();
    expect(component.loggedIn).toBeTruthy();

    // Toggle again to logout
    component.toggleLogin();
    expect(component.loggedIn).toBeFalsy();
  });

  it('should disable bookForm when not logged in', () => {
    component.checkLoginStatus();
    expect(component.bookForm.disabled).toBeTruthy();
  });

  it('should enable bookForm when logged in', () => {
    component.loggedIn = true;
    component.checkLoginStatus();
    expect(component.bookForm.enabled).toBeTruthy();
  });

  it('should add a book successfully when logged in', () => {
    component.loggedIn = true;
    component.bookForm.setValue({ title: 'Test Book', author: 'Test Author' });
    component.addBook();
    expect(component.toastr.success).toHaveBeenCalled();
    expect(bookServiceMock.addBook).toHaveBeenCalled();
  });

  it('should show an error toast when adding a book fails', () => {
    component.loggedIn = true;
    component.bookForm.setValue({ title: 'No Author Book' });
    component.addBook();
    expect(component.toastr.error).toHaveBeenCalled();
    expect(bookServiceMock.addBook).toHaveBeenCalled();
  });
});