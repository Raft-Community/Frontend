'use client';

import Link from 'next/link';

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';

type IGetClusterMember = {
  error: string;
  members: {
    port: number;
    ip: string;
    name: string;
    id: string;
  }[];
};

export const getServerSideProps: GetServerSideProps<{
  response: IGetClusterMember;
}> = async () => {
  const res = {
    error: 'OK',
    members: [
      {
        name: 'Instance 1',
        ip: '127.0.0.1',
        port: 2333,
        id: '1',
      },
      {
        name: 'Instance 2',
        ip: '127.0.0.1',
        port: 2334,
        id: '2',
      },
      {
        name: 'Instance 3',
        ip: '127.0.0.1',
        port: 2335,
        id: '3',
      },
      {
        name: 'Instance 4',
        ip: '127.0.0.1',
        port: 2336,
        id: '4',
      },
      {
        name: 'Instance 5',
        ip: '127.0.0.1',
        port: 2337,
        id: '5',
      },
      {
        name: 'Instance 6',
        ip: '127.0.0.1',
        port: 2338,
        id: '6',
      },
    ],
  };
  return { props: { response: res } };
};

function InstanceCard({
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
    <div className="card h-56 bg-base-300 shadow-xl">
      <Link
        href={`/home/?name=${name}&id=${id}&ip=${ip}&port=${port}`}
        className="h-full"
      >
        <div className="card-body">
          <h1 className="card-title">{name}</h1>
          <p className="card-text">Instance id: {id}</p>
          <p className="card-text">IP: 127.0.0.1</p>
          <p className="card-text">Port: 2333</p>
        </div>
      </Link>
    </div>
  );
}

function AddInstanceForm() {
  return (
    <form method="dialog" className="modal-box">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        ✕
      </button>
      <h3 className="font-bold text-lg">Add an Instance Here</h3>
      <div className="">
        <label htmlFor="ip" className="text-gray-700 font-semibold mb-2 block">
          IP
        </label>
        <input
          type="text"
          id="ip"
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-primary"
        />
      </div>
      <div>
        <label
          htmlFor="port"
          className="text-gray-700 font-semibold mb-2 block"
        >
          Port
        </label>
        <input
          type="text"
          id="port"
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-primary"
        />
      </div>
      <div className="modal-action">
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

function AddInstance() {
  return (
    <div className="card h-56 flex justify-center items-center">
      <button
        className="btn btn-primary"
        onClick={() => (window as any).addInstance.showModal()}
      >
        Add an instance
      </button>
      <dialog id="addInstance" className="modal">
        <AddInstanceForm />
      </dialog>
    </div>
  );
}

export default function Instances({
  response,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const instances = response.members;

  return (
    <>
      <div className="card h-4/5 w-4/5 bg-base-200 shadow-xl overflow-auto">
        <div className="card-body">
          <h1 className="card-title">Instances</h1>
          <div className="h-full w-full grid grid-cols-4 gap-8 p-1">
            {instances.map((instance) => (
              <InstanceCard
                name={instance.name}
                id={instance.id}
                ip={instance.ip}
                port={instance.port}
                key={instance.id}
              />
            ))}
            <AddInstance />
          </div>
        </div>
      </div>
    </>
  );
}