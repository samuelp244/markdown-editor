import React, { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:1337";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const MdPreview = () => {
  const [htmlRes, setHtmlRes] = useState("");
  useEffect(() => {
    socket = io(BACKEND_URL);
  }, []);
  useEffect(() => {
    socket.on("htmlRes", ({ html }) => {
      setHtmlRes(html);
    });
  });
  return (
    <div className='flex flex-col gap-3 bg-white h-full rounded-xl'>
      {/* <p>Here is you rendered html</p> */}
      <div className=" text-black" dangerouslySetInnerHTML={{ __html: htmlRes }} />
    </div>
  );
};

export default MdPreview;
