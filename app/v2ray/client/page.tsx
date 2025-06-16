'use client';

import { useState, useEffect } from "react";

export default function Page() {

  const downloadUrls = [
    ["/v2ray/client/v2rayNG-android-arm.apk", "v2rayNG / 安卓"],
    ["/v2ray/client/v2rayN-windows.zip", "v2rayN / Windows"],
    ["/v2ray/client/v2rayN-linux.zip", "v2rayN / Linux"],
    ["/v2ray/client/v2rayN-macos-intel.dmg", "v2rayN / MacOS(Intel)"],
    ["/v2ray/client/v2rayN-macos-arm.dmg", "v2rayN / MacOS(ARM)"],
  ];

  const [copyText, setCopyText] = useState("");
  useEffect(() => {
    setCopyText(window.location.protocol + '//' + window.location.host + '/v2ray/icc.sub');
  });

  return (
    <div className="absolute top-0 bottom-0 w-full bg-black">
      <div className="w-full my-[48px] grid gap-8 grid-cols-1 justify-items-center items-center text-center">
        <div className="text-white">
          点击对应平台下载
        </div>
        {
          downloadUrls.map((item, index) => {
            return <a key={index} href={item[0]}>
              <div className="bg-[#16A34A] text-white p-4 rounded-lg active:bg-green-700 hover:bg-[#15803D] transition-colors w-[200px]">
                {item[1]}
              </div>
            </a>
          })
        }
        <div className="text-white">
          订阅链接：
          <div className="select-all">
            {copyText}
          </div>
        </div>
      </div>
    </div>
  );
}
