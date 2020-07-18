import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BibleLibService } from '../services/bible-lib.service';

@Component({
  selector: 'lib-verse-modal',
  templateUrl: './verse-modal.component.html',
  styleUrls: ['./verse-modal.component.scss'],
})
export class VerseModalComponent implements OnInit, OnDestroy {

  @ViewChild('slides', { static: true }) slider: IonSlides;
  bibleSubscription: Subscription;
  bookList: Array<string>;
  bookChapters: Array<number>;
  chapterVerses: Array<number>;
  book: string;
  chapter: number;
  verse: number;
  segments = [{name: 'Books', value: 0}, {name: 'Chapters', value: 1}, {name: 'Verses', value: 2}];
  segment = 0;
  view;
  options = {
    autoHeight: true,
    allowTouchMove: false
  }

  constructor(
    private bibleService: BibleLibService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.openSubscription();
  }

  openSubscription() {
    this.bibleSubscription = this.bibleService.CurrentBibleState$.subscribe(value => {
      console.log(value);
      this.bookList = this.bibleService.getBooks();
      this.bookChapters = this.bibleService.getBookChapters(value.book);
      this.book = value.book;
      this.chapter = value.chapter;
      this.verse = value.verse;
      console.log('book', value.book, 'Chapter: ', value.chapter, 'Verse', value.verse);
    });
  }

  segmentChanged() {
    this.slider.slideTo(this.segment, 500);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
    this.view = this.segment;
  }

  selectBook(book) {
    console.log(book);
  }

  closeModal() {
    this.modalController.dismiss();
  }

  ngOnDestroy() {
    if (this.bibleSubscription) {
      this.bibleSubscription.unsubscribe();
    }
  }
}
