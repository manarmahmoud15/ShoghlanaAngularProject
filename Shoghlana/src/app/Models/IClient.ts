import { IClientJob } from "./iclient-job";
import { Ijob } from "./ijob";

export interface IClient{
    id : number,
    name : string,
    description : string,
    country : string,
    phone : string,
    image : string,
    registerationTime : Date,
    jobsCount : number,
    completedJobsCount : number,
    jobs : IClientJob[] 
}