import axios from "axios"



const commonApi=async(method,url,reqBody)=>{
    let objConfig={
        method:method,
        url:url,
        data:reqBody
    }

    return await axios(objConfig).then((elm)=>{
        return elm
    }).catch((err)=>{
        return err
    })

}


export default commonApi