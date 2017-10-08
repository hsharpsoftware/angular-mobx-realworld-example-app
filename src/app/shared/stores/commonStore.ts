import { observable, action, reaction, toJS } from 'mobx';
import agent from '../agent';
import { Injectable } from '@angular/core';
import { computed } from 'mobx-angular';

class Tag {
  @observable title: string;

  constructor( title) {
    this.title = title;
  }
}

class CommonStore {

  @observable appName = 'Conduit';
  @observable token = window.localStorage.getItem('jwt');
  @observable appLoaded = false;

  @observable tags = [];
  @observable isLoadingTags = false;

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem('jwt', token);
        } else {
          window.localStorage.removeItem('jwt');
        }
      }
    );
  }

  @computed get allTags() {
    return this.tags;
  }

  @action loadTags() {
    this.isLoadingTags = true;
    return agent.Tags.getAll()
      .then(action(({ tags }) => { tags.map(t => this.tags.push(new Tag(t.toLowerCase()))); console.log(this.tags); }))
      .finally(action(() => { this.isLoadingTags = false; }));
  }

  @action setToken(token) {
    this.token = token;
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }

}

const commonStore = new CommonStore();

export default commonStore;