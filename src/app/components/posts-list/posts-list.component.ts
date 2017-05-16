import { Component, Input, Inject } from '@angular/core';

import { Post } from "../../models/post";
import { PostPreviewComponent } from '../post-preview/post-preview.component';
import { Router } from '@angular/router';

@Component({
    selector: "posts-list",
    templateUrl: "posts-list.component.html"
})
export class PostsListComponent {

    @Input() posts: Post[];
    constructor(private route:Router){}


    /*------------------------------------------------------------------------------------------------------------------|
     | ~~~ Red Path ~~~                                                                                                 |
     |------------------------------------------------------------------------------------------------------------------|
     | Maneja el evento del componente PostPreviewComponent que indica la selección del autor de un post y navega a la  |
     | dirección correspondiente. Recuerda que para hacer esto necesitas inyectar como dependencia el Router de la app. |
     | La ruta a navegar es '/posts/users', pasando como parámetro el identificador del autor.                          |
     |------------------------------------------------------------------------------------------------------------------*/

      postPreviewComponent(post){
        const _ruta :string = `/posts/users/${post.author.id}`;
        this.route.navigateByUrl(_ruta);
    }

    /*-----------------------------------------------------------------------------------------------------------------|
     | ~~~ Green Path ~~~                                                                                              |
     |-----------------------------------------------------------------------------------------------------------------|
     | Maneja el evento del componente PostPreviewComponent que indica la selección de un post y navega a la dirección |
     | correspondiente. Recuerda que para hacer esto necesitas inyectar como dependencia el Router de la app.  La ruta |
     | a navegar es '/posts', pasando como parámetro el identificador del post.                                        |
     |-----------------------------------------------------------------------------------------------------------------*/
     detallesPostSeleccionado(post:Post){
         const _ruta :string = `/posts/${post.id}`;
         this.route.navigateByUrl(_ruta);
     }
}
