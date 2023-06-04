import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center">
        <Link href="/instances">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Instances
          </button>
        </Link>
      </div>
    </>
  );
}
