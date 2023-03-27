import { Component, OnInit } from '@angular/core';
import { QuoteService } from '@app/home/quote.service';

import { environment } from '@env/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  version: string | null = environment.version;

  constructor(private birdService: QuoteService) {}

  ngOnInit() {
    let birds = <HTMLDivElement>document.querySelector('.birds');
    this.birdService.init(2, birds);
  }
}
