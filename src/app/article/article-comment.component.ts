import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Comment, User, UserService } from '../shared';

@Component({
  selector: 'article-comment',
  templateUrl: './article-comment.component.html'
})
export class ArticleCommentComponent implements OnInit {

  canModify: boolean;

  @Input() comment: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();

  constructor(
      private userService: UserService
  ) {}

  ngOnInit() {
    // Load the current user's data
    this.userService.currentUser.subscribe(
        (userData: User) => {
          this.canModify = (userData.username === this.comment.author.username);
        }
    );
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }

}
