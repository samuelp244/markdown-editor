import React, { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:1337";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const MdEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const [htmlRes, setHtmlRes] = useState("");
  
  useEffect(() => {
    socket = io(BACKEND_URL);
  }, []);

  useEffect(() => {
    socket.on("htmlRes", ({ html }) => {
      setHtmlRes(html);
    });
  });

  const handleMarkdownInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setMarkdown(value);
    // Emit Markdown text to the backend
    socket.emit("markdown", { markdownText: value });
  };
  
  return (
    <div className='col-span-1 sm:col-span-2 pt-20 h-full overflow-hidden'>
      <div className='h-full grid grid-cols-1 sm:grid-cols-2 w-full'>
        <textarea
          placeholder='Enter your Markdown Code'
          className='bg-gray-800 text-white p-4 resize-none  max-sm:min-h-[45vh]'
          value={markdown}
          onChange={handleMarkdownInput}
        />
        <div
          className='bg-white text-black p-4 overflow-y-auto'
          dangerouslySetInnerHTML={{ __html: htmlRes }}
        />
      </div>
    </div>
  );
};

export default MdEditor;
