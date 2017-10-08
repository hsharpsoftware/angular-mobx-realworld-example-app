import { Component, OnInit } from '@angular/core';
import CommonStore from 'app/shared/stores/commonStore';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  commonStore = CommonStore;
  
  constructor() { 
  }

  ngOnInit() {
    this.commonStore.loadTags();    
  }

}
