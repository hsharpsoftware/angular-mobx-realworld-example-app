import { observable, action, reaction, toJS } from 'mobx';
import agent from '../agent';
import { Injectable } from '@angular/core';

class CommonStore {

  @observable appName = 'Conduit';
  @observable token = window.localStorage.getItem('jwt');
  @observable appLoaded = false;

  @observable tags : string[] = [];
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

  @action loadTags() {
    this.isLoadingTags = true;
    return agent.Tags.getAll()
      .then(action(({ tags }) => { this.tags = tags.map(t => t.toLowerCase()); }))
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