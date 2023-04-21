import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post, PostRequest } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  posts: Post[] = [];
  constructor(private postService: PostsService) {}

  ngOnInit(): void {
    this.loadData();
    this.postService.newPost
      .subscribe(post => this.posts.unshift(post))
  }
  
  async loadData(event?:any, pull: boolean = false){
    (await this.postService.getPosts(pull))
      .subscribe((posts:PostRequest) => {
        this.posts.push(...posts.posts);
        console.log(this.posts);
        
        if (event) {
          event.target.complete();

          event.target.disabled = (posts.posts.length === 0);
        }
      })
  }

  doRefresh(event:any){
    this.posts = [];
    this.loadData(event, true)

  }

}
