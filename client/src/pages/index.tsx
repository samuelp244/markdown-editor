import Head from "next/head";
import MdEditor from "@/components/textAreas/MdEditor";

export default function Home() {

  return (
    <>
      <Head>
        <title>Markdown Editor</title>
        <meta name='description' content='Real-time Markdown Editor' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='grid grid-cols-1 sm:grid-cols-2 min-h-screen'>
        <header className='h-20 text-white flex items-center justify-start px-10 fixed w-full z-10'>
          <h1 className='text-3xl'>.md Editor</h1>
        </header>
        <MdEditor />
      </main>
    </>
  );
}
