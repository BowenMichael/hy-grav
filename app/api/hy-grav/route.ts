import {NextRequest, NextResponse} from "next/server";
import dbConnect from '../../../lib/dbconnect'
import GravRecords from '../../../schema/grav'

export async function GET(req : NextRequest){
    await dbConnect()

    const gravRecords = await GravRecords.find({})
    
    return NextResponse.json(gravRecords)
}

export async function POST(req : NextRequest) {
    await dbConnect();
    const body =  await req.json();
    if(!body.gravStatus) return NextResponse.json({error : 'Failed to post: Gav status undefined'})
    const gravStatus = body.gravStatus
    
    const newGravRecord = await GravRecords.create({date : Date.now(), gravStatus})
    console.log(newGravRecord)
    return NextResponse.json(newGravRecord);
}