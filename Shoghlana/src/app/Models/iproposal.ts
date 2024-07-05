import { ProposalStatus } from "../Enums/proposal-status";
import { IproposalImage } from "./iproposal-image";

export interface IProposal {

  id: number;

  deadLine?: string  // calulated after approve

  approvedTime?: string; // known when the client approves

  duration: number; // given from the freelancer

  description: string;

  price: number;

  status: ProposalStatus;

  reposLinks?: string[];

 //---------------------------------

 images? : IproposalImage[] ;  // saeed : should be array of string >> no need to store each img id in front and its proposal id is already accessed using the returned proposal obj from backend

 freelancerId: number

 jobId: number
 clientName? : string
 freelancerName : string
 freelancerTitle : string
 jobTitle? : string
}
