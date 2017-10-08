import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import CommonStore from 'app/shared/stores/commonStore';

@Injectable()
export class TagsService {
  constructor (
  ) {
    CommonStore.loadTags();    
  }

  getAll(): string[] {
    let result = CommonStore.tags;
    console.log(result);
    return result;
  }

}
