import { Component, Input, OnInit } from '@angular/core';

import { Article, ArticleListConfig } from '../models';
import { ArticlesService } from '../services';
import ArticlesStore from 'app/shared/stores/articlesStore';

@Component({
  selector: 'article-list',
  templateUrl: './article-list.component.html'
})
export class ArticleListComponent implements OnInit {
  query: ArticleListConfig;
  results: Article[];
  loading = false;
  currentPage = 1;
  totalPages: Array<number> = [1];
  articlesStore = ArticlesStore

  @Input() limit: number;

  constructor (
    private articlesService: ArticlesService
  ) {}

  ngOnInit() {
    this.articlesStore.loadArticles();
  }

  @Input()
  set config(config: ArticleListConfig) {
    if (config) {
      this.query = config;
      this.currentPage = 1;
      this.runQuery();
    }
  }

  setPageTo(pageNumber) {
    this.currentPage = pageNumber;
    this.runQuery();
  }

  runQuery() {
    this.loading = true;
    this.results = [];

    // Create limit and offset filter (if necessary)
    if (this.limit) {
      this.query.filters.limit = this.limit;
      this.query.filters.offset =  (this.limit * (this.currentPage - 1))
    }

    this.articlesService.query(this.query)
    .subscribe(data => {
      this.loading = false;
      this.results = data.articles;

      // Used from http://www.jstips.co/en/create-range-0...n-easily-using-one-line/
      this.totalPages = Array.from(new Array(Math.ceil(data.articlesCount / this.limit)), (val, index) => index + 1);
    });
  }
}
