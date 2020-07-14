import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BibleLibComponent } from './bible-lib.component';

describe('BibleLibComponent', () => {
  let component: BibleLibComponent;
  let fixture: ComponentFixture<BibleLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibleLibComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BibleLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
