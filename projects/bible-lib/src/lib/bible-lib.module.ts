import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibleLibService } from './services/bible-lib.service';
import { BibleLibComponent } from './bible-lib.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { BibleVerseComponent } from './bible-verse/bible-verse.component';
import { ScrollVanishDirective } from './directives/scroll-vanish.directive';
import { VerseModalComponent } from './verse-modal/verse-modal.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BibleLibComponent,
    BibleVerseComponent,
    ScrollVanishDirective,
    VerseModalComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    IonicModule
  ],
  providers: [
    BibleLibService
  ],
  exports: [
    BibleLibComponent
  ]
})
export class BibleLibModule { }
