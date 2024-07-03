import { UserRole } from "../Enums/UserRole";

export interface GoogleAuthData {
    name : string,
    firstName : string,
    email : string,
    id : string,
    idToken : string,
    photoUrl : string,
    role : number | null
}
