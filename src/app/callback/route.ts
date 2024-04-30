import { DonationModel } from "@/models/Donation";
import mongoose from "mongoose";
import { NextRequest } from "next/server";

// 付款以后会有几个callback发过来，如果状态是paid就是付款成功了。
async function handler(req: NextRequest) {
  const data = await req.json()
  
  console.log({data});
  
  await mongoose.connect(process.env.MONGODB_URI as string);
  const {status, order_id} = data;
  if (status === 'paid') {
    await DonationModel.findByIdAndUpdate(order_id, {paid: true});
  }

  return Response.json(true);
}

export {handler as GET, handler as POST};