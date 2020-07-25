import { Component, OnInit, ViewChild, Input } from '@angular/core';
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
  book: string = '';
  chapter: number = 0;
  oldT: OldTestamentBook[];
  newT: NewTestamentBook[];
  firstBook: string = 'Genesis';
  lastBook: string = 'Revelation';
  isOldTest = false;
  isNewTest = false;
  books: string[];
  chapters: number[];

  @Input('environment')
  set environment(value: string) {
    console.log('setter', value);
    this.bibleLibService.Environment = value;
  }

  constructor(
    private bibleLibService: BibleLibService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.bibleLibService.retrieveBibleReference();
    this.loadInit();
  }

  loadInit() {
    this.bibleLibService.DataObject$.subscribe(result => {
      if (result.length > 0) {
        this.data = result;
        this.book = this.bibleLibService.getBook(result);
        this.chapter = this.bibleLibService.getChapter(result);
      }
    });

    this.bibleLibService.CurrentBibleState$.subscribe(value => {
      this.bibleLibService.retrieveBibleReference(value['book'], value['chapter']);
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
    this.bibleLibService.retrieveBibleReference(this.book, this.chapter);
    this.content.scrollToTop(1);
  }

  previousChapter() {
    if (this.validateBackAction()) {
      this.chapter--;
      this.updateBibleState();
      this.bibleLibService.retrieveBibleReference(this.book, this.chapter);
      this.content.scrollToTop(1);
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
