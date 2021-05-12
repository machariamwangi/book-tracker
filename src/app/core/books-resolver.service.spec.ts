/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BooksResolverService } from './books-resolver.service';

describe('Service: BooksResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BooksResolverService]
    });
  });

  it('should ...', inject([BooksResolverService], (service: BooksResolverService) => {
    expect(service).toBeTruthy();
  }));
});
