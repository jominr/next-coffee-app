'use server';
import { DonationModel } from "@/models/Donation";
import { ProfileInfoModel } from "@/models/ProfileInfo";
import axios from "axios";
import md5 from "md5";
import mongoose from "mongoose";

export async function createDonation(formData: FormData): Promise<string | false> {
  // 1. save to db
  const { name, message, amount, crypto, email} = Object.fromEntries(formData);
  mongoose.connect(process.env.MongoDB_URI as string);
  const donationDoc = await DonationModel.create({
    name, message, amount, crypto, email, paid:true
  })
  
  


  // 2. create a cryptomus invoice
  // 根据文档的API来确认每一步的操作
  const profileInfoDoc = await ProfileInfoModel.findOne({ email });
  if (!profileInfoDoc) {
    return false;
  }
  return 'http://localhost:3000/' + profileInfoDoc.username + '?success=1'

  // 下面是模拟的，没有账号，走不通
  const endpoint = 'https//api.cryptomus.com';
  const data = {
    amount: (parseInt(amount as string) * 5).toString() + '.00',
    currency: 'USD',
    order_id: donationDoc._id.toString(),
    to_currency: (crypto as string).toUpperCase(),
    url_callback: 'https://jksjk/callback?id='+donationDoc._id,
    url_return: 'http://localhost:3000/' + profileInfoDoc.username,
    url_success: 'http://localhost:3000/' + profileInfoDoc.username + '?success=1'
  }
  const apiKey = process.env.CRYPTOMUS_PAYMENT_API_KEY as string;
  const merchantId = process.env.CRYPTOMUS_MERCHANT_UID as string;
  // btoa: base64_encode function in javescript
  const sign = md5(btoa(JSON.stringify(data)) + apiKey);
  try {
    const response = await axios.post(endpoint, data, {
      headers: {
        merchantId, 
        sign
      }
    })
    return response.data.result.url;

  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      console.log(e.response.status);
      console.log(e.response.data);
    }
  }
  return false;
  
}