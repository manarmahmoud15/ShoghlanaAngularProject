import { Iproject } from "./Iproject"
import { Skill } from "./Skill"
import { Ijob } from "./ijob"

export interface IFreelancer {
    id : number ,
    name : string ,
    // description : string ,
    title : string ,
    skills : Skill[],
    skillIDs : number[],
    // rate : number ,
    address:string
    personalImageBytes: string | File; // Updated to string | File
    overview:string,
    portfolio : Iproject[],
    workingHistory : Ijob[]
    // portfolio : string[] | null ,
    // workHistory : string[] | null
}