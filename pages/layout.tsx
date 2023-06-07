import Head from "next/head";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>Raft Community</title>
        <meta name="description" content="A raft based distributed community" />
      </Head>
      <div className="h-screen w-screen flex justify-center items-center">
        {children}
      </div>
    </>
  );
}
