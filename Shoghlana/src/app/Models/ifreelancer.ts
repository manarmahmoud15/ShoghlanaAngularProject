export interface IFreelancer {
    id : number , 
    name : string ,
    description : string ,
    title : string ,    
    skills : string[]
    rate : number ,
    imgURL : string ,
    portfolio : string[] | null ,
    workHistory : string[] | null
}
