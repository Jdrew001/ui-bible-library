import { Component, OnInit, ViewChild } from '@angular/core';
import { BibleLibService } from './services/bible-lib.service';
import { Testament, BibleModel, OldTestamentBook, NewTestamentBook } from './models/bible.model';
import { IonContent, ModalController } from '@ionic/angular';
import { VerseModalComponent } from './verse-modal/verse-modal.component';

@Component({
  selector: 'bible-component',
  templateUrl: './bible-lib.component.html',
  styleUrls: ['./bible-lib.component.scss'],
})
export class BibleLibComponent implements OnInit {

  @ViewChild('content') content: IonContent;
  data: BibleModel[];
  book: string;
  chapter: number;
  oldT: OldTestamentBook[];
  newT: NewTestamentBook[];
  firstBook: string = 'Genesis';
  lastBook: string = 'Revelation';
  isOldTest = false;
  isNewTest = false;
  books: string[];
  chapters: number[];

  constructor(
    private bibleLibService: BibleLibService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.books = this.bibleLibService.getBooks();
    this.chapters = this.bibleLibService.getBookChapters(this.firstBook);
    this.bibleLibService.retrieveBooks(Testament.All).subscribe(result => {
      this.oldT = result[0] as OldTestamentBook[];
      this.newT = result[1] as NewTestamentBook[];
    });
    this.loadInit();
  }

  loadInit() {
    this.bibleLibService.retrieveBibleReference().subscribe(result => {
      console.log(result);
      this.data = result['bible'];
      this.book = result['book']
      this.chapter = result['chapter'];
      this.updateBibleState();
    });
  }

  async openVerseModal(e){
    const modal = await this.modalController.create({
      component: VerseModalComponent,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  nextChapter() {
    if (this.validateForNextBook(this.book)) {
      let index = this.books.findIndex(x => x === this.book);
      let newIndex = index + 1;
      console.log(this.books[newIndex]);
      this.book = this.books[newIndex];
      this.chapter = 1;
    } else {
      this.chapter++;
    }
    
    this.updateBibleState();
    this.bibleLibService.retrieveBibleReference(this.book, this.chapter).subscribe(result => {
      this.content.scrollToTop(1);
      this.data = result['bible'];
      this.book = result['book']
      this.chapter = result['chapter'];
    });
  }

  previousChapter() {
    if (this.validateBackAction()) {
      this.chapter--;
      this.updateBibleState();
      this.bibleLibService.retrieveBibleReference(this.book, this.chapter).subscribe(result => {
        this.content.scrollToTop(1);
        this.data = result['bible'];
        this.book = result['book']
        this.chapter = result['chapter'];
      });
    }
  }

  disableBackAction() {
    let res = false;
    if (this.book === this.firstBook && this.chapter == 1) {
          res = true;
    }
    return res;
  }

  disableForwardAction() {
    let res = false;
    return res;
  }

  private updateBibleState() {
    let obj = {
      book: this.book,
      chapter: this.chapter
    };
    this.bibleLibService.emitCurrentBibleState(obj);
  }

  private validateForNextBook(book) {
    let chapters = this.bibleLibService.getBookChapters(book);
    let res = false;
    if (this.chapter == chapters.length) {
      res = true;
    }

    return res;
  }

  private validateForwardAction() {
    let res = false;
    if (this.chapter == (this.bibleLibService.getBookChapters(this.book).length++)) {
      true;
    }

    return res;
  }

  private validateBackAction() {
    let res = false;
    if (this.chapter != 1) {
      res = true;
    }

    return res;
  }
}
