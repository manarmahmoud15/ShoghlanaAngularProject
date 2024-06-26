import { Time } from "@angular/common";
import { Skill } from "./Skill";

export interface Iproject{
    id : number,
    title : string,
    description : string,
    poster : string,
    skills : Skill[],
    link : string ,
    images : string[],
    skillIDs : number[],
    freelancerId : number ,

   timePublished : string,
   showSkills? : boolean 
}