import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
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
  @Output('updateBible') updateBible: EventEmitter<{book?: string, chapter?: number, verse?: number}> = new EventEmitter();
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

  slideChanged() {
    this.slider.getActiveIndex().then(res => {
      this.segment = res;
      this.view = this.segment;
    });
  }

  selectItem(item, type) {
    switch (type) {
      case 'book':
        this.book = item;
        this.segment = 1;
      break;
      case 'chapter':
        this.chapter = item;
        this.segment = 2;
      break;
      case 'verse':
        this.verse = item;
        // TODO: Need to close and update parent
      break;
    }
  }

  closeModal() {
    this.segment = 0;
    this.view = null;
    this.modalController.dismiss();
  }

  closeAndUpdate() {
    this.bibleService.CurrentBibleState$.next({book: this.book, chapter: this.chapter, verse: this.verse});
    this.closeModal();
  }

  ngOnDestroy() {
    if (this.bibleSubscription) {
      this.bibleSubscription.unsubscribe();
    }
  }
}
