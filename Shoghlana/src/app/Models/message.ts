import { User } from "./user";

export interface Message {
    from : string ;
    to? : string;
    content : string ;
}
