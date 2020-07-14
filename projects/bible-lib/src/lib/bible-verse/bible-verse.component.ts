import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-bible-verse',
  templateUrl: './bible-verse.component.html',
  styleUrls: ['./bible-verse.component.scss'],
})
export class BibleVerseComponent implements OnInit {

  @Input('verse') verse;

  constructor() { }

  ngOnInit() {}

}
