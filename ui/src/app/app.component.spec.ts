import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { HttpClientModule } from '@angular/common/http';
import { BookService } from './services/book/book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        BookComponent,
      ],
      imports: [HttpClientModule, HttpClientTestingModule, ToastrModule, ToastrModule.forRoot(), NgxPaginationModule, FormsModule, ReactiveFormsModule],
      providers: [BookService, ToastrService,]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Library Books Manager'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Library Books Manager');
  });
});
