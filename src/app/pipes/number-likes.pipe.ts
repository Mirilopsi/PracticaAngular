import { Pipe, PipeTransform } from "@angular/core";
import * as moment from 'moment';
import "moment/locale/es";
import { Post } from '../models/post';


@Pipe({name: 'numLikes'})
export class NumLikesPipe implements PipeTransform{
    
    transform(value:number) {
        
        return value?value:0;
    }
}