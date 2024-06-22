import { ProposalStatus } from "../Enums/proposal-status";
import { IproposalImage } from "./iproposal-image";

export interface IProposal {

  id: number;

  deadLine?: string  // calulated after approve

  approvedTime?: string; // known when the client approves

  Duration: number; // given from the freelancer

  Description: string;

  Price: number;

  status: ProposalStatus;

  reposLinks?: string[];

 //---------------------------------

 images? : IproposalImage[] ;

 freelancerId: number

 jobId: number
}
