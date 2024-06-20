import { Ijob } from "./ijob";

export interface ICategory {

    id: number;

    title: string;

    description: string;

    selected?: boolean;   // ???

    //--------------------------

    jobs?: Ijob[];
}   