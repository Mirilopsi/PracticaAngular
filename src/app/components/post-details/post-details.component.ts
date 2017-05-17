import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Post } from "../../models/post";
import { Category } from '../../models/category';
import { User } from '../../models/user';

@Component({
    templateUrl: "post-details.component.html",
    styleUrls: ["post-details.component.css"]
})
export class PostDetailsComponent implements OnInit {
    @Input() post: Post;
    @Input() category: Category;
    @Input() realUser: boolean;
    
    constructor(private _activatedRoute: ActivatedRoute, private route:Router) { }
    
    ngOnInit(): void {
        this._activatedRoute.data.forEach((data: {post: Post})  => this.post = data.post);
        window.scrollTo(0, 0);
        this.compruebaUsuario();
    }

    plainTextToHtml(text: string): string {
        return `<p>${text.replace(/\n/gi, "</p><p>")}</p>`;
    }

    /*---------------------------------------------------------------------------------------------------------------|
     | ~~~ Red Path ~~~                                                                                              |
     |---------------------------------------------------------------------------------------------------------------|
     | Añade un manejador que navegue a la dirección correspondiente a los posts del autor indicado. Recuerda que    |
     | para hacer esto necesitas inyectar como dependencia el Router de la app. La ruta a navegar es '/posts/users', |
     | pasando como parámetro el identificador del autor.                                                            |
     |---------------------------------------------------------------------------------------------------------------*/

    navegarPostsAutor(post:Post){
        const _ruta :string = `/posts/users/${post.author.id}`;
        this.route.navigateByUrl(_ruta);
     }

    /*--------------------------------------------------------------------------------------------------------------------|
     | ~~~ Yellow Path ~~~                                                                                                |
     |--------------------------------------------------------------------------------------------------------------------|
     | Añade un manejador que navegue a la dirección correspondiente a los posts de la categoría indicada. Recuerda que   |
     | para hacer esto necesitas inyectar como dependencia el Router de la app. La ruta a navegar es '/posts/categories', |
     | pasando como parámetro el identificador de la categoría.                                                           |
     |--------------------------------------------------------------------------------------------------------------------*/
     mostrarCategorias(category: Category){
        const _ruta: string = `/posts/categories/${category.id}`;
        this.route.navigateByUrl(_ruta);
        
     }

     compruebaUsuario(){
        if(this.post.author.id === User.defaultUser().id)
            this.realUser=true;
        else
            this.realUser = false;
     }


     editarPost(post:Post){
        const _ruta: string = `/posts/edit/${post.id}`;
        this.route.navigate([_ruta]);
     }
}
