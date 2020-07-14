import { Component, OnInit } from '@angular/core';
import { BibleLibService } from './services/bible-lib.service';
import { Testament, BibleModel } from './models/bible.model';

@Component({
  selector: 'bible-component',
  templateUrl: './bible-lib.component.html',
  styleUrls: ['./bible-lib.component.scss'],
})
export class BibleLibComponent implements OnInit {

  data: BibleModel[];
  book: string;
  chapter: number;

  constructor(private bibleLibService: BibleLibService) { }

  ngOnInit() {
    this.bibleLibService.retrieveBooks(Testament.All).subscribe(result => {
      let oldTestament = result[0];
      let newTestament = result[1];
    });
    this.bibleLibService.retrieveBibleReference().subscribe(result => {
      console.log(result);
      this.data = result['bible'];
      this.book = result['book']
      this.chapter = result['chapter'];
    });
  }

}
