import Link from 'next/link';
import Layout from './layout';
import { ReactElement } from 'react';
import type { NextPageWithLayout } from './_app';

const Page: NextPageWithLayout = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Link href="/instances">
        <button className="btn btn-primary rounded">Instances</button>
      </Link>
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Page;
