import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PostRequest, Post } from '../interfaces/interfaces';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  
  pagePost = -1;

  newPost: EventEmitter<Post> = new EventEmitter();

  constructor(private http:HttpClient, private storageService: StorageService) { }

  async getPosts(pull: boolean = false):Promise<Observable<PostRequest>>{
    if(pull)
    this.pagePost = -1;
    const token = await this.storageService.getToken() || '';
    
    const headers = new HttpHeaders({
      "x-token": token
    });
    
    this.pagePost ++;    
    return this.http.get<PostRequest>(`${URL}/posts/?page=${this.pagePost}`,{headers});     
    
  }

  async create(post:Post) {
    const token = await this.storageService.getToken() || '';
    
    const headers = new HttpHeaders({
      "x-token": token
    });
    return new Promise(resolve =>{

      this.http.post(`${URL}/posts`,post,{headers})
        .subscribe((resp:any) => {
          if(resp.ok){
            this.newPost.emit(resp.post)
          }
          resolve(resp.ok);        
        })        
    })
  }

  sleep (ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

        

