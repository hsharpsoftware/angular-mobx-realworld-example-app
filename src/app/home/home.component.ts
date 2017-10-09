import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleListConfig, UserService } from '../shared';

import UserStore from 'app/shared/stores/userStore';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    private userService: UserService,
  ) {
  }

  userStore = UserStore;

  listConfig: ArticleListConfig = new ArticleListConfig();

  ngOnInit() {
  }

  setListTo(type: string = '', filters: Object = {}) {
    // Otherwise, set the list object
    this.listConfig = {type: type, filters: filters};
  }
}
