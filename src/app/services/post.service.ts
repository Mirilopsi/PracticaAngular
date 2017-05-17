import { Inject, Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";

import { BackendUri } from "./settings.service";
import { Post } from "../models/post";
import { Category } from '../models/category';

@Injectable()
export class PostService {
    constructor(
        private _http: Http,
        @Inject(BackendUri) private _backendUri: any) { }

    getPosts(): Observable<Post[]> {
        let date:number = new Date().getTime();
        
        /*----------------------------------------------------------------------------------------------|
         | ~~~ Pink Path ~~~                                                                            |
         |----------------------------------------------------------------------------------------------|
         | Pide al servidor que te retorne los posts ordenados de más reciente a menos, teniendo en     |
         | cuenta su fecha de publicación. Filtra también aquellos que aún no están publicados, pues no |
         | deberían mostrarse al usuario.                                                               |
         |                                                                                              |
         | En la documentación de 'JSON Server' tienes detallado cómo hacer el filtrado y ordenación de |
         | los datos en tus peticiones, pero te ayudo igualmente. La querystring debe tener estos       |
         | parámetros:                                                                                  |
         |                                                                                              |
         |   - Filtro por fecha de publicación: publicationDate_lte=x (siendo x la fecha actual)        |
         |   - Ordenación: _sort=publicationDate&_order=DESC                                            |
         |----------------------------------------------------------------------------------------------*/

        return this._http
                   .get(`${this._backendUri}/posts?publicationDate_lte=${date}&_sort=publicationDate&_order=DESC`)
                   .map((response: Response) => Post.fromJsonToList(response.json()));
    }

    getUserPosts(id: number): Observable<Post[]> {
        let date:number = new Date().getTime();
        
        /*----------------------------------------------------------------------------------------------|
         | ~~~ Red Path ~~~                                                                             |
         |----------------------------------------------------------------------------------------------|
         | Ahora mismo, esta función está obteniendo todos los posts existentes, y solo debería obtener |
         | aquellos correspondientes al autor indicado. Añade los parámetros de búsqueda oportunos para |
         | que retorne solo los posts que buscamos. Ten en cuenta que, además, deben estar ordenados    |
         | por fecha de publicación descendente y obtener solo aquellos que estén publicados.           |
         |                                                                                              |
         | En la documentación de 'JSON Server' tienes detallado cómo hacer el filtrado y ordenación de |
         | los datos en tus peticiones, pero te ayudo igualmente. La querystring debe tener estos       |
         | parámetros:                                                                                  |
         |                                                                                              |
         |   - Filtro por autor: author.id=x (siendo x el identificador del autor)                      |
         |   - Filtro por fecha de publicación: publicationDate_lte=x (siendo x la fecha actual)        |
         |   - Ordenación: _sort=publicationDate&_order=DESC                                            |
         |----------------------------------------------------------------------------------------------*/
        return this._http
                   .get(`${this._backendUri}/posts?author.id=${id}&publicationDate_lte=${date.valueOf()}&_sort=publicationDate&_order=DESC`)
                   .map((response: Response) => Post.fromJsonToList(response.json()));
    }

    getCategoryPosts(id: number): Observable<Post[]> {
        let date:number = new Date().getTime();
        
        /*--------------------------------------------------------------------------------------------------|
         | ~~~ Yellow Path ~~~                                                                              |
         |--------------------------------------------------------------------------------------------------|
         | Ahora mismo, esta función está obteniendo todos los posts existentes, y solo debería obtener     |
         | aquellos correspondientes a la categoría indicada. Añade los parámetros de búsqueda oportunos    |
         | para que retorne solo los posts que buscamos. Ten en cuenta que, además, deben estar ordenados   |
         | por fecha de publicación descendente y obtener solo aquellos que estén publicados.               |
         |                                                                                                  |
         | Este Path tiene un extra de dificultad: un objeto Post tiene una colección de objetos Categoria, |
         | y 'JSON Server' no permite filtrado en colecciones anidadas. Por tanto, te toca a ti darle una   |
         | solución a este marrón. Una posibilidad sería aprovechar el operador 'map' de los observables.   |
         | Sirven para transformar flujos de datos y, de alguna forma, es lo que vamos buscando. Podríamos  |
         | obtener todos los posts y luego filtrarlos por categoría en 'map'. Ahí te lo dejo.               |
         |                                                                                                  |
         | En la documentación de 'JSON Server' tienes detallado cómo hacer el filtrado y ordenación de los |
         | datos en tus peticiones, pero te ayudo igualmente. La querystring debe tener estos parámetros:   |
         |                                                                                                  |
         |   - Filtro por fecha de publicación: publicationDate_lte=x (siendo x la fecha actual)            |
         |   - Ordenación: _sort=publicationDate&_order=DESC                                                |
         |--------------------------------------------------------------------------------------------------*/


        return this._http
                   .get(`${this._backendUri}/posts?publicationDate_lte=${date.valueOf()}&_sort=publicationDate&order=DESC`)
                   .map((response:Response)=>
                    {
                        let lista =  Post.fromJsonToList(response.json());
                        let listaCategorias: Category;

                        let filtrado = lista.filter(filtro =>{
                            return filtro.categories.findIndex(encontrado => encontrado.id=== id) !== -1;
                        });
                       return filtrado;
                    
                    });
    }

    getPostDetails(id: number): Observable<Post> {
        return this._http
                   .get(`${this._backendUri}/posts/${id}`)
                   .map((response: Response) => Post.fromJson(response.json()));
    }

    createPost(post: Post): Observable<Post> {
        
        /*----------------------------------------------------------------------------------|
         | ~~~ Purple Path ~~~                                                              |
         |----------------------------------------------------------------------------------|
         | Utiliza el cliente HTTP para guardar en servidor el post indicado. La ruta sobre |
         | la cual tienes que hacer la petición POST es '/posts'. Recuerda que siempre que  |
         | se crea una entidad en servidor es una buena práctica retornar la misma con los  |
         | datos actualizados obtenidos tras la inserción; puedes usar la función estática  |
         | 'fromJson() para crar un nuevo objeto Post basado en la respuesta HTTP obtenida. |
         |----------------------------------------------------------------------------------*/
         return this._http
                   .post(`${this._backendUri}/posts`,post)
                   .map((response: Response) =>  Post.fromJson(response.json()));
    }

    editPost(post:Post): Observable<Post> {
        return this._http
                   .put(`${this._backendUri}/posts/${post.id}`, post)
                   .map((response: Response) => Post.fromJson(response.json()));
    }
}
