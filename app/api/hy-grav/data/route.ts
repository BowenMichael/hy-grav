import {NextRequest, NextResponse} from "next/server";
import dbConnect from "../../../../lib/dbconnect";
import GravRecords from '../../../../schema/grav'
import {ComputeRecordData} from "../../../../middleware/server/recordDataCompute";


export async function GET(req : NextRequest) {
    
    return await ComputeRecordData();

}

