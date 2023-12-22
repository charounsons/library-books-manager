// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateBookModalComponent } from './components/update-book-modal/update-book-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, BookComponent, UpdateBookModalComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-left'
    }), NgbModule, 
    FormsModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
