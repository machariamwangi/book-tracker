import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { allBooks, allReaders } from 'app/data';
import { Reader } from "app/models/reader";
import { Book } from "app/models/book";
import { BookTrackerError } from 'app/models/bookTrackerError';
import { OldBook } from 'app/models/oldBook';
import {map, tap, catchError} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  mostPopularBook: Book = allBooks[0];

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Reader[] {
    //this.http.get('').subscribe(data =>  console.log(data))
    return allReaders;
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks():Observable<Book[]> {
    console.warn("getting all books from the server")
    return this.http.get<Book[]>('/api/books').pipe(
    catchError(error => this.handleHttpError(error))
    );
   // return allBooks;
  }
private handleHttpError(error : HttpErrorResponse): Observable<BookTrackerError> {
 let dataError = new BookTrackerError();
 dataError.errorNumber = 100;
 dataError.message = error.statusText;
 dataError.friendlyMessage = "An error occured Retrieving Data.";
 return throwError(dataError)
}
  getBookById(id: number): Observable<Book> {
    let getHeaders : HttpHeaders = new HttpHeaders({
      'Accept': 'application/json',
    });
    return this.http.get<Book>(`/api/books/${id}`, {
      headers: getHeaders
    });
    //return allBooks.find(book => book.bookID === id);
  }
  getOldBookById(id: number):   Observable<OldBook> {
    return this.http.get<Book>(`/api/books/${id}`)
    .pipe(
      map(b => <OldBook>{
        bookTitle: b.title,
        year: b.publicationYear
      }),
      tap(classicBook => console.log(classicBook))
    );
  }

addBook(newBook: Book): Observable<Book> {
  return this.http.post<Book>('/api/books', newBook, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}

updateBook(updatedBook: Book): Observable<void> {
  return this.http.put<void>(`/api/books/${updatedBook.bookID  }`, updatedBook, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}

deleteBook(bookId: number) : Observable<void> {
  return this.http.delete<void>(`/api/books/${bookId}`)
}


}
