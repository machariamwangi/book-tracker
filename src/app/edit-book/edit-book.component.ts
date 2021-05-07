import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'app/models/book';
import { DataService } from 'app/core/data.service';
import { OldBook } from 'app/models/oldBook';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: []
})
export class EditBookComponent implements OnInit {

  selectedBook: Book;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    let bookID: number = parseInt(this.route.snapshot.params['id']);
   this.dataService.getBookById(bookID).subscribe(
     (data: Book )=>  this.selectedBook = data,
     (error: any) => console.log("eror", error),
     () => console.log('call success')
   );

   this.dataService.getOldBookById(bookID).subscribe(
     (data: OldBook) => console.log("old===>", data)
   )
  }

  setMostPopular(): void {
    this.dataService.setMostPopularBook(this.selectedBook);
  }

  saveChanges(): void {
    this.dataService.updateBook(this.selectedBook).subscribe(
      (data : void) => console.log(data),
      (error: any) => console.log(error),
      () =>  console.log('Update success')
    )
    console.warn('Save changes to book not yet implemented.');
  }
}
