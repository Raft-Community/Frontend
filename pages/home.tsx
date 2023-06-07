'use client';

import { useRouter } from 'next/router';

function SendPost() {
  return (
    <div className="h-5/6 w-full p-4 justify-center border-b-2">
      <textarea
        className="textarea textarea-primary h-5/6 w-full resize-none"
        placeholder="Input your idea here..."
      ></textarea>
      <div className="h-1/6 w-full flex items-center justify-end">
        <button className="btn btn-primary btn-sm mt-1">Send</button>
      </div>
    </div>
  );
}

function Posts() {
  return (
    <div className="min-h-2/3 w-full flex flex-col p-6 pt-8 bg-base-200">
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
}

function PostCard() {
  return (
    <div className="card lg:card-side shadow-xl my-2 bg-base-100">
      <figure>
        <picture>
          <img
            src="https://www.bing.com/th?id=OVFT.GRnX9zMsJjskE2T_2NiRlS"
            alt="Landscape picture"
            width={186}
            height={88}
          />
        </picture>
      </figure>
      <div className="card-body">
        <h2 className="card-title">New album is released!</h2>
        <p>Click the button to listen on Spotiwhy app.</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Listen</button>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, child, scroll }: { title: string; child: React.ReactNode; scroll?: boolean}) {
  return (
    <div className="w-full flex justify-center items-center p-2">
      <div className={`card w-full h-full shadow-xl bg-base-200 ${scroll ? "overflow-y-scroll" : ""}`}>
        <div className="card-body py-4 px-6">
          <h2 className="card-title">{title}</h2>
          {child}
        </div>
      </div>
    </div>
  );
}

function BasicInfo({
  name,
  ip,
  port,
  id,
}: {
  name: string;
  ip: string;
  port: number;
  id: string;
}) {
  return (
    <table className="table-auto h-full w-full">
      <tbody>
        <tr>
          <td className="border px-4 py-2">id</td>
          <td className="border px-4 py-2">{id}</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">name</td>
          <td className="border px-4 py-2">{name}</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">addr</td>
          <td className="border px-4 py-2">{ip}:{port}</td>
        </tr>
        <tr>
          <td className="border px-4 py-2">status</td>
          <td className="border px-4 py-2 text-green-500">online</td>
          {/* <td className="border px-4 py-2 text-red-500">offline</td> */}
        </tr>
      </tbody>
    </table>
  );
}

function MemberList() {
  const members = [
    { id: '1', name: 'Instance 1' },
    { id: '2', name: 'Instance 2' },
    { id: '3', name: 'Instance 3' },
  ];
  return (
    <div className="h-full w-full">
      <table className="table-auto h-full w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Member</th>
            <th className="border px-4 py-2">Options</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) =>
            <tr key={member.id}>
              <td className="border px-4 py-2">{member.name}</td>
              <td className="border px-4 py-2 flex justify-center">
                <button className="btn btn-error btn-sm">kick</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function SystemInfo() {
  const infos = [
    { id: '1', content: 'Instance 1 want to join' },
    { id: '2', content: 'Instance 2 want to kick Instance 3' },
    { id: '3', content: 'Instance 3 want to join' },
  ];
  return (
    <div className="h-full w-full">
      <table className="table-auto h-full w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Info</th>
            <th className="border px-4 py-2">Options</th>
          </tr>
        </thead>
        <tbody>
          {infos.map((info) =>
            <tr key={info.id}>
              <td className="border px-4 py-2">{info.content}</td>
              <td className="border px-4 py-2 flex justify-around">
                <button className="btn btn-success btn-sm">Accept</button>
                <button className="btn btn-error btn-sm">Reject</button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    
  );
}

export default function Home() {
  const router = useRouter();
  const { name, ip, port, id } = router.query as unknown as { name: string; ip: string; port: number; id: string };
  console.log(router.query);

  return (
    <>
      <div className="h-full w-full bg-base-100 flex flex-row">
        <div className="h-full w-2/3 flex flex-col overflow-y-scroll">
          <div className="h-1/3 w-full flex flex-col">
            <div className="h-1/6 w-full flex items-center sticky top-0 bg-base-300">
              <button
                className="btn btn-outline btn-sm"
                onClick={() => window.history.back()}
              >
                Back
              </button>
              <h1 className="text-xl font-bold pl-2">Raft Community</h1>
            </div>
            <SendPost />
          </div>
          <Posts />
        </div>
        <div className="h-full w-1/3 grid grid-rows-3 grid-flow-col gap-4">
          <InfoCard
            title="Node Basic Info"
            child={<BasicInfo
              id={id}
              name={name}
              ip={ip}
              port={port}
            />}
          />
          <InfoCard title="Member List" scroll child={<MemberList />} />
          <InfoCard title="System Info" scroll child={<SystemInfo />} />
        </div>
      </div>
    </>
  );
}
