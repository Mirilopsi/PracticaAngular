import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { PostService } from '../../services/post.service';

@Component({
    selector: 'likes-post',
    templateUrl: 'likes-post.component.html',
    styleUrls: ["likes-post.component.css"]
})

export class LikesPostsComponent  {
    @Input() post:Post;
    @Input() liked: boolean;

    private _postSubscription: Subscription;

    constructor(
    private _postService: PostService,
    private _router: Router) { }
    
    ngOnInit(){
        this.liked = this.encontrarLike(this.post.likes) >= 0;
    }

    ngOnDestroy(): void {
        this._unsubscribePostCreation();
    }

    encontrarLike(likes:Array<number>){
        return likes.indexOf(User.defaultUser().id);
    }

    anadirLike(post:Post){
        if(!this.liked){
            post.likes.push(User.defaultUser().id);
            this.liked=true;
        }
        this.editarLikes(post);
    }

    quitarLike(post:Post){
        
        let idLike = this.encontrarLike(this.post.likes);

            post.likes.splice(idLike);
            this.liked = false;
        this.editarLikes(post);
        
    }

    private editarLikes(post:Post){
        this._unsubscribePostCreation();
        this._postSubscription = this._postService.editPost(post).subscribe();
    }

    private _unsubscribePostCreation(): void {
    if (this._postSubscription) {
        this._postSubscription.unsubscribe();
    }
}   
}