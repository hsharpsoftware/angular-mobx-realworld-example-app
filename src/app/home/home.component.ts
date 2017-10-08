import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleListConfig, UserService } from '../shared';
import CommonStore from 'app/shared/stores/commonStore';

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

  isAuthenticated: boolean;
  listConfig: ArticleListConfig = new ArticleListConfig();
  commonStore = CommonStore;

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;

        // set the article list accordingly
        if (authenticated) {
          this.setListTo('feed');
        } else {
          this.setListTo('all');
        }
      }
    );
    this.commonStore.loadTags();
  }

  setListTo(type: string = '', filters: Object = {}) {
    // If feed is requested but user is not authenticated, redirect to login
    if (type === 'feed' && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return;
    }

    // Otherwise, set the list object
    this.listConfig = {type: type, filters: filters};
  }
}
