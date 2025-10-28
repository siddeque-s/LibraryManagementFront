import { BaseUrl } from "./BaseUrl";
import commonApi from "./CommonApi";

export const getData=async()=>{
    return await commonApi("get",`${BaseUrl}/books`,"")
}
export const postData=async(reqBody)=>{
    return await commonApi("post",`${BaseUrl}/books`,reqBody)
}


export const deleteApi=async(id)=>{
    return await commonApi("delete",`${BaseUrl}/books/${id}`,{})
}


export const patchApi=async(id,reqBody)=>{
    return await commonApi("patch",`${BaseUrl}/books/${id}`,reqBody)
}