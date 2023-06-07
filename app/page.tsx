import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <Link href="/instances">
          <button className="btn btn-primary rounded">
            Instances
          </button>
        </Link>
      </div>
    </>
  );
}
