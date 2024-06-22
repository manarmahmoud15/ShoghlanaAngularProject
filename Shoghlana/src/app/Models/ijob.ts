import { JobStatus } from "../Enums/JobStatus";
import { ExperienceLevel } from "../Enums/experience-level";
import { IRate } from "./i-rate";
import { ISkill } from "./i-skill";
import { ICategory } from "./icategory";
import { IFreelancer } from "./ifreelancer";
import { IProposal } from "./iproposal";

export interface Ijob {

    id: number,

    title: String,

    description: String,

    postTime: string

    price: string,

    minBudget: number;

    maxBudget: number;

    imgURL: string,

    experienceLevel: ExperienceLevel;

    status: JobStatus;

    skills: ISkill[];

    proposals?: IProposal[];

    freelancers?: IFreelancer[];

    //----------------------------------

    acceptedFreelancerId?: number;

    acceptedFreelancerName?: string,

    freelancerImg?: string,

    clientId: number;

    clientName: string;

    clientImage: string;

    categoryTitle: string;

    categoryId: number,

    category: ICategory;

    proposalsCount: number;

    rate?: IRate;
}