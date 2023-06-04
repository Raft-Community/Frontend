import Head from 'next/head';

export default function Instances() {
  return (
    <>
      <Head>
        <title>Instances</title>
      </Head>

      <div className="h-screen w-screen grid grid-cols-4 gap-8">
        <div className="bg-gray-400"></div>
        <div className="bg-gray-500"></div>
        <div className="bg-gray-600"></div>
        <div className="bg-gray-700"></div>
        <div className="bg-gray-300"></div>
      </div>
    </>
  );
}
