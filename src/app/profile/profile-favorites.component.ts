import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ArticleListConfig, Profile } from '../shared';

@Component({
  selector: 'profile-favorites',
  templateUrl: './profile-favorites.component.html'
})
export class ProfileFavoritesComponent implements OnInit {
  profile: Profile;
  favoritesConfig: ArticleListConfig = new ArticleListConfig();

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.parent.data.subscribe(
      (data: {profile: Profile}) => {
        this.profile = data.profile;
        this.favoritesConfig.filters.favorited = this.profile.username;
      }
    );
  }
}
