import { IClientJob } from "./iclient-job";
import { Ijob } from "./ijob";

export interface IClient{
    Id : Number,
    name : string,
    description : string,
    country : string,
    phone : string,
    image : File,
    registerationTime : Date,
    jobsCount : number,
    completedJobsCount : number,
    jobs : IClientJob[] 
}