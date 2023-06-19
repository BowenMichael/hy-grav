import {NextRequest, NextResponse} from "next/server";
import dbConnect from "../../../../lib/dbconnect";
import GravRecords from '../../../../schema/grav'
import GravDataRecords from '../../../../schema/history'
import {GetGravRecordsData} from "../../../../middleware/hy-grav";
import {data} from "autoprefixer";
import {ComputeRecordData} from "../../../../middleware/server/recordDataCompute";


export async function GET(req : NextRequest) {
    await dbConnect()

    /*const records = await GravRecords.find({gravStatus : { $in : [-1, 1]}})

    const groups = records.reduce((groups, record) => {
        const date = new Date(record.date).toDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(record);
        return groups;
    }, {});

    console.log(groups)    */
    
    const dataRecords = await GravDataRecords.find({})
    console.log(dataRecords)
    return NextResponse.json(dataRecords);

}

export async function POST(req : NextRequest) {
    await dbConnect()
    
    const data = await (await ComputeRecordData()).json();
    
    console.log(data)

    const dataRecord = await GravDataRecords.create({date : Date.now(), data})
    
    return NextResponse.json(dataRecord);

}