import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BibleVerseComponent } from './bible-verse.component';

describe('BibleVerseComponent', () => {
  let component: BibleVerseComponent;
  let fixture: ComponentFixture<BibleVerseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibleVerseComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BibleVerseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
