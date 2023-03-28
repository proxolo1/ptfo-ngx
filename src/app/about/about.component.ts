import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { AvatarService } from './avatar.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  version: string | null = environment.version;

  constructor(private avatarService: AvatarService) {}

  ngOnInit() {
    let avatar = document.querySelector('.avatar');
    this.avatarService.init(avatar);
  }
}
