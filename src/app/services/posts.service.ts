import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Post {
  title: string;
  content: string;
  date: string;
}
@Injectable({
  providedIn: 'root'
})

export class PostsService {
  posts: Array<Post>;
  post: Post;

  constructor(private _http: HttpClient) { }
  public getPosts(): Observable<Array<Post>> {

    return new Observable<Array<Post>>(observer => {

      this.loadPosts().subscribe(
        response => {
          if (response) {
            this.posts = response;
            observer.next(this.posts);
            observer.complete();
          } else {
            observer.error(response);
          }
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  loadPosts(): Observable<Array<Post>> {
  return this._http.get<Array<Post>>(environment.cmsUrl);
  }

  public getPost(slug: string): Observable<Post> {

    return new Observable<Post>(observer => {
      this.loadPost(slug).subscribe(
          response => {
              if (response) {
                this.post = response[0];
                observer.next(this.post);
                observer.complete();
              } else {
                observer.error(response);
              }
          },
          error => {
            observer.error(error);
          }
      );
    });
  }

  loadPost(slug: string): Observable<Post> {
    const url = 'http://localhost/xo/?rest_route=/wp/v2/posts?slug=' + slug;
    return this._http.get<Post>(url);
  }
}
