import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibleLibService } from './services/bible-lib.service';
import { BibleLibComponent } from './bible-lib.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { BibleVerseComponent } from './bible-verse/bible-verse.component';



@NgModule({
  declarations: [
    BibleLibComponent,
    BibleVerseComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule.forRoot()
  ],
  providers: [
    BibleLibService
  ],
  exports: [
    BibleLibComponent
  ]
})
export class BibleLibModule { }
