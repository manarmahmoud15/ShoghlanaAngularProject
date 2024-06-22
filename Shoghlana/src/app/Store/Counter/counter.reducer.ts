import { createReducer, on } from "@ngrx/store";
import { increaseCounter } from "./counter.action";
const initialstate=0;
export const counterReducer= createReducer(initialstate,
  on(increaseCounter,(state)=>state+1)
)
//create reducer takes value you want to change &
//(on) takes the action we want to apply on value(import from action)
//(on) must be imported from @ngrx/store 
//ps: the component where i wanna use action and reducer must inject store service
