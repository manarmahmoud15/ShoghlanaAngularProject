import { JobStatus } from "../Enums/JobStatus";
import { ExperienceLevel } from "../Enums/experience-level";
import { IRate } from "./i-rate";
import { ISkill } from "./i-skill";
import { ICategory } from "./icategory";
import { IFreelancer } from "./ifreelancer";
import { IProposal } from "./iproposal";
import { Irate } from "./Irate";

export interface Ijob {

  id: number,

  title: String,

  description: String,

  postTime?: string,
  // postTime? : Date,
  formattedPostTime?: string,

  price: string,

  minBudget: number;

  maxBudget: number;

  imgURL: string,

  experienceLevel: ExperienceLevel;

  status: JobStatus;

  skills: ISkill[];

  proposals?: IProposal[];

  freelancers?: IFreelancer[];

  freelancerName: string,

  poster : string ; // doesn't exist in the API models => just added it here to display a default img

  // freelancerImg : string ,
  //----------------------------------

  acceptedFreelancerId?: number;

  acceptedFreelancerName?: string,

  freelancerImg?: string,

  clientId: number;

  clientName: string;

  clientImage: string;

  categoryTitle?: string;
  catID: Number,
  categoryId: number,

  category: ICategory;

  proposalsCount: number;

  rate?: IRate;
  // rate? : Irate,
  showFeedback?: boolean
}
