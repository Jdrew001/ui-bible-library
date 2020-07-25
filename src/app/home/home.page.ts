import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BibleModel } from 'bible-lib';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  data: Array<BibleModel>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    //this.retrieveBibleData();
  }

  retrieveBibleData() {
    const url = `${environment.baseUrl}${'getAllBibles'}`;
    this.http.get<Array<BibleModel>>(url).subscribe(data => {
      this.data = data;
    });
  }

}
