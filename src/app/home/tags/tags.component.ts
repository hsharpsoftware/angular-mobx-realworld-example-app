import { Component, OnInit } from '@angular/core';
import CommonStore from 'app/shared/stores/commonStore';
import UserStore from 'app/shared/stores/userStore';
import ArticlesStore from 'app/shared/stores/articlesStore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  commonStore = CommonStore;
  userStore = UserStore;
  articlesStore = ArticlesStore

  constructor(
    private router: Router,    
  ) { 
  }

  ngOnInit() {
    this.commonStore.loadTags();    
  }

  setListTo(tag:string) {
    this.articlesStore.setPredicate( { tag : tag } );
  }

}
