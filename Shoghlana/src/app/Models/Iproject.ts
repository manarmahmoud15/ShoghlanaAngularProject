import { Time } from "@angular/common";
import { Skill } from "./Skill";

export interface Iproject{
    id : number,
    title : string,
    description : string,
    poster : string,
    skills : Skill[],
   // timePublished : Time
   showSkills? : boolean 
}