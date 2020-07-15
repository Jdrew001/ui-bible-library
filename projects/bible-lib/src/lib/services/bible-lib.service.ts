import { Injectable } from '@angular/core';
import { Testament, BibleModel } from '../models/bible.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BibleConstant } from '../bible-lib.constant';
import { combineLatest, Subject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BibleLibService {

  private oldBooks = BibleConstant.OLD_TESTAMENT_BOOKS;
  private newBooks = BibleConstant.NEW_TESTAMENT_BOOKS;
  private bible: Array<BibleModel> = BibleConstant.BIBLE_REFERENCES;
  private defaultBook = 'Genesis';
  private defaultChapter = 1;

  constructor(private http: HttpClient) { }

  /**
   * Retrieve the books of the bible
   * @param testament All, Old or New testament
   */
  retrieveBooks(testament: Testament): Observable<any> {
    let resSub;
    switch(testament) {
      case Testament.All:
        resSub = this.getAllBooks();
      break;
      case Testament.New:
        resSub = this.getAllOldBooks();
      break;
      case Testament.Old:
        resSub = this.getAllNewBooks();
      break;
    }

    return of(resSub);
  }

  retrieveBibleReference(book: string = this.defaultBook, chapter: number = this.defaultChapter, verse?: number) {
    return of({book: book, chapter: chapter, bible: this.filterToItem(book, chapter, verse)});
  }

  private getAllBooks() {
    return [this.oldBooks, this.newBooks];
  }

  private getAllOldBooks() {
    return this.oldBooks;
  }

  private getAllNewBooks() {
    return this.newBooks;
  }

  private filterToItem(book: string, chapter: number, verse?: number) {
    let tempBible = this.bible.filter(x => x['book_name'] === book && x['chapter'] == chapter);
    return tempBible;
  }
}
