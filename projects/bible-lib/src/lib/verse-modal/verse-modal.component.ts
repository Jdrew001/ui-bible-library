import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BibleLibService } from '../services/bible-lib.service';

@Component({
  selector: 'lib-verse-modal',
  templateUrl: './verse-modal.component.html',
  styleUrls: ['./verse-modal.component.scss'],
})
export class VerseModalComponent implements OnInit, OnDestroy {

  bibleSubscription: Subscription;
  bookList: Array<string>;
  bookChapters: Array<number>;
  chapterVerses: Array<number>;
  book: string;
  chapter: number;
  verse: number;

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

  segmentChanged(e) {

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
