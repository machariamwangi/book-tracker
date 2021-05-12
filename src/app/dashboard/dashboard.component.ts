import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { Book } from "app/models/book";
import { Reader } from "app/models/reader";
import { DataService } from 'app/core/data.service';
import { BookTrackerError } from 'app/models/bookTrackerError';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  allBooks: Book[];
  allReaders: Reader[];
  mostPopularBook: Book;

  constructor(private dataService: DataService,
              private title: Title,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
    // this.dataService.getAllBooks().subscribe(
    //   (data: Book[]  | BookTrackerError) =>  this.allBooks = <Book[]>data,
    //   (error: any) => console.log(error),
    //   () => console.log('All done getting Books.')
    // );
 let resolvedData: Book[] | BookTrackerError = this.route.snapshot.data['resolvedBooks']


   if(resolvedData instanceof BookTrackerError) {
     console.log(`Dashboard Component Error: ${resolvedData.friendlyMessage}`)
   }else {
     this.allBooks = resolvedData
   }

    this.mostPopularBook = this.dataService.mostPopularBook;

    this.title.setTitle(`Book Tracker`);
  }

  deleteBook(bookID: number): void {
  this.dataService.deleteBook(bookID).subscribe(
    (data: void) => {
      let index: number = this.allBooks.findIndex(book => book.bookID === bookID);
      this.allBooks.splice(index, 1);
    },
    (error: any) => console.log(error),
    ()=> console.log("Transaction Complted")
  )
    //console.warn(`Delete book not yet implemented (bookID: ${bookID}).`);
  }

  deleteReader(readerID: number): void {
    console.warn(`Delete reader not yet implemented (readerID: ${readerID}).`);
  }

}
