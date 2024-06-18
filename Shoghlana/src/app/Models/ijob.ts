import { JobStatus } from "../Enums/JobStatus";

export interface Ijob {
    id:Number ,
    title : String ,
    description : String ,
    price : string,
    imgURL : string ,
    rate : Number ,
    freelancerName : string ,
    freelancerImg : string ,
    catID : Number ,
}
