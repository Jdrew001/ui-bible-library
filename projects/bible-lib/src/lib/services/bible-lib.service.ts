import { Injectable } from '@angular/core';
import { Testament, BibleModel } from '../models/bible.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BibleConstant } from '../bible-lib.constant';
import { combineLatest, Subject, Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BibleLibService {

  private oldBooks = BibleConstant.OLD_TESTAMENT_BOOKS;
  private newBooks = BibleConstant.NEW_TESTAMENT_BOOKS;
  private bible: Array<BibleModel> = [];
  private environment: string;
  private defaultBook = 'Genesis';
  private defaultChapter = 1;
  private data$: BehaviorSubject<Array<BibleModel>> = new BehaviorSubject<Array<BibleModel>>([]);
  private currentBibleState$: BehaviorSubject<{book: string, chapter: number, verse?: number}>
    = new BehaviorSubject<{book: string, chapter: number, verse?: number}>(null);

  get CurrentBibleState$() { return this.currentBibleState$; }
  get DataObject$() { return this.data$; }
  get Bible() { return this.bible; }
  set Bible(data: Array<BibleModel>) { this.bible = data; }
  set Environment(val: string) { this.environment = val; }

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

  emitCurrentBibleState(value: {book: string, chapter: number, verse?: number}) {
    this.CurrentBibleState$.next(value);
  }

  retrieveBibleReference(book: string = this.defaultBook, chapter: number = this.defaultChapter, verse?: number) {
    const url = `${this.environment}bibles?book_name=${book}&chapter=${chapter}`;
    this.http.get<Array<BibleModel>>(url).subscribe(res => this.data$.next(res));
  }

  getBook(data): string {
    let book = data.map(x => x.book_name);
    return [...new Set(book)][0] as string;
  }

  getChapter(data): number {
    let cha = data.map(x => x.chapter);
    return [...new Set(cha)][0] as number;
  }

  getBooks(): string[] {
    let books = this.bible.map(x => x.book_name);
    return [...new Set(books)];
  }

  getBookChapters(book: string): number[] {
    let tempBible = this.bible.filter(x => x.book_name === book);
    let chapters = [...new Set(tempBible.map(x => x.chapter))];

    return chapters;
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
