import Head from 'next/head';

import { createContext, useState, useEffect } from 'react';

export const ErrorHandlerContext = createContext<
  React.Dispatch<React.SetStateAction<string>>
>(() => {});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [error, setError] = useState<string>('');

  // when the error is set, show the alert for 3 seconds
  useEffect(() => {
    if (error) {
      setTimeout(() => setError(''), 3000);
    }
  }, [error]);

  return (
    <>
      <Head>
        <title>Raft Community</title>
        <meta name="description" content="A raft based distributed community" />
      </Head>
      {error && (
        <div className="alert alert-error absolute z-10 top-10 w-1/3 left-1/3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
      <ErrorHandlerContext.Provider value={setError}>
        <div className="h-screen w-screen flex justify-center items-center">
          {children}
        </div>
      </ErrorHandlerContext.Provider>
    </>
  );
}
