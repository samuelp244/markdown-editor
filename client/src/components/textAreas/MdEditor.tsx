import React, { useEffect, useState } from "react";
import { Textarea } from "@nextui-org/input";
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
  const handleMarkdownInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMarkdown(value);
    // Emit Markdown text to the backend
    socket.emit("markdown", { markdownText: value });
  };
  return (
    <>
      <div>
        <Textarea
          label='Mark down'
          placeholder='Enter your Mark down Code'
          className=''
          value={markdown}
          onChange={handleMarkdownInput}
          color='secondary'
          minRows={12}
        />
      </div>

      {/* <p>Here is you rendered html</p> */}
      <div
        className='flex flex-col gap-3 bg-white h-full rounded-xl text-black'
        dangerouslySetInnerHTML={{ __html: htmlRes }}
      />
    </>
  );
};

export default MdEditor;
