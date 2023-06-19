import {GET_PROPERTIES, GetAPIUrlWithPath, POST_PROPERTIES} from "../util";

export async function GetGravRecords(){
    return (await (await fetch(GetAPIUrlWithPath('hy-grav'), {
        ...GET_PROPERTIES
    })).json() as any[]).length
}

export async function GetGravRecordsData(){
    return (await (await fetch(GetAPIUrlWithPath('hy-grav/data'), {
        ...GET_PROPERTIES
    })).json())
}

export async function GetGravRecordsHistory(){
    return (await (await fetch(GetAPIUrlWithPath('hy-grav/history'), {
        ...GET_PROPERTIES
    })).json())
}


export async function PostGravRecord(gravStatus : number){
    return await fetch(GetAPIUrlWithPath('hy-grav'), {
        ...POST_PROPERTIES,
        body : JSON.stringify({gravStatus})
    })
}