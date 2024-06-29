import { JobStatus } from "../Enums/JobStatus";

export interface IClientJob {
  id: number;
title: string;
minBudget: string;
maxBudget: string;
description:string;
status: string;
clientName: string;
clientImg: string;
catID: number;
postTime:string;
}
