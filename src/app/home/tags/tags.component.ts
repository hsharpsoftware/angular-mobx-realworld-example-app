import { Component, OnInit } from '@angular/core';
import CommonStore from 'app/shared/stores/commonStore';
import ArticlesStore from 'app/shared/stores/articlesStore';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  commonStore = CommonStore;
  articlesStore = ArticlesStore

  ngOnInit() {
    this.commonStore.loadTags();
  }

  setListTo(tag: string) {
    this.articlesStore.setPredicate({ tag });
  }

}
