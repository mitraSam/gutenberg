/* eslint-disable consistent-return,no-unused-vars,no-param-reassign */
import {SERVER_REQUEST_ERROR} from "../constants";


export default function (state={},action) {
    if(action.type===SERVER_REQUEST_ERROR){
        return action.error
    }
    return state

}