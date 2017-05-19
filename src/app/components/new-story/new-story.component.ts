import { Component, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Subscription";

import { Post } from "../../models/post";
import { PostService } from "../../services/post.service";

@Component({
    templateUrl: "new-story.component.html",
    styleUrls: ["new-story.component.css"]
})
export class NewStoryComponent implements OnDestroy {

    private _postSubscription: Subscription;
    @Input() postAntiguo: Post;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _postService: PostService,
        private _router: Router) { }

  
    ngOnInit(): void {
        this._activatedRoute.data.forEach((data: {post: Post})  => this.postAntiguo = data.post);
        window.scrollTo(0, 0);
    }
    ngOnDestroy(): void {
        this._unsubscribePostCreation();
    }

    createPost(post: Post): void {
        this._unsubscribePostCreation();
        this._postSubscription = this._postService.createPost(post).subscribe(() => this._router.navigate(["/"]));
    }

    editPost(post: Post): void {
        console.log('editado');
        this._unsubscribePostCreation();
        this._postSubscription = this._postService.editPost(post).subscribe(() => this._router.navigate(["/"]));
    }



    private _unsubscribePostCreation(): void {
        if (this._postSubscription) {
            this._postSubscription.unsubscribe();
        }
    }
}
