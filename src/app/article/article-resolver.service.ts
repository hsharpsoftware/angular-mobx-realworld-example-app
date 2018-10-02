import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Article } from '../shared';
import ArticlesStore from 'app/shared/stores/articlesStore';

@Injectable()
export class ArticleResolver implements Resolve<Article> {

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return Observable.create( function(observer) {
      observer.next(ArticlesStore.getArticle(route.params['slug']));
    } );
  }
}
