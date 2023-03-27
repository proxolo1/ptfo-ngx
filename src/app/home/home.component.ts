import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { QuoteService } from './quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private birdService: QuoteService) {}

  ngOnInit() {
    let birds = <HTMLDivElement>document.querySelector('.birds');
    this.birdService.init(30, birds);
  }
}
