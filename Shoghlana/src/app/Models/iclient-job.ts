import { JobStatus } from "../Enums/JobStatus";

export interface IClientJob {
    id: number;
  title: string;
  MinPrice: string;
  MaxPrice: string;
  status: JobStatus;
  clientName: string;
  clientImg: string;
  catID: number;
}
