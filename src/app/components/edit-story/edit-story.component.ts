import { Component, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from "rxjs/Subscription";

import { Post } from "../../models/post";
import { PostService } from "../../services/post.service";

@Component({
    templateUrl: "edit-story.component.html",
    styleUrls: ["edit-story.component.css"]
})
export class EditStoryComponent implements OnDestroy {

    private _postSubscription: Subscription;
    modificarPost:Post;
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

    editPost(post: Post): void {
       
        this._unsubscribePostCreation();
        this._postSubscription = this._postService.editPost(post).subscribe(() => this._router.navigate(["/"]));
    }

    private _unsubscribePostCreation(): void {
        if (this._postSubscription) {
            this._postSubscription.unsubscribe();
        }
    }
}
