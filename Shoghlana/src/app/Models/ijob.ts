import { JobStatus } from "../Enums/JobStatus";
import { Irate } from "./Irate";

export interface Ijob {
    id:Number ,
    title : String ,
    description : String ,
    price : string,
    imgURL : string ,
    freelancerName : string ,
    freelancerImg : string ,
    catID : Number ,
    postTime? : Date,
    formattedPostTime? : string
    rate? : Irate,
    categoryTitle? : string,
    showFeedback? : boolean
}
