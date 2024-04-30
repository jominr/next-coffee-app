"use client"

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

// 付完款以后，页面上有个go back按钮，返回到我们的网站，会有?success=1
const DonationStatus = () => {
  const [show, setShow] = useState(false);
  const [showed, setShowed] = useState(false);
  // locahost, every component renders twice, 所以我们要处理下, 只展示1次。
  useEffect(()=> {
    if (location.href.includes('?success=1') && !show) {
      setShow(true);
    }
    if (show && !showed) {
      toast.success('Thanks for your donation');
      setShowed(true);
    }
  }, [show])
  return (
    <div>
      
    </div>
  );
};

export default DonationStatus;