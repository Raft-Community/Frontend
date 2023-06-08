'use client';

import Link from 'next/link';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { IGetClusterMember, ClusterMember, getCluster } from './api/cluster';
import { useEffect, useState } from 'react';

export const getServerSideProps: GetServerSideProps<{
  response: IGetClusterMember;
}> = async () => {
  return { props: { response: await getCluster() } };
};

function InstanceCard({
  name,
  ip,
  port,
  id,
  status,
}: {
  name: string;
  ip: string;
  port: number;
  id: string;
  status: string;
}) {
  return (
    <div className="card h-56 bg-base-300 shadow-xl">
      <Link
        href={`/home/?name=${name}&id=${id}&ip=${ip}&port=${port}`}
        className="h-full"
      >
        <div className="card-body">
          <h1 className="card-title">{name}</h1>
          <p className="card-text">ID: {id}</p>
          <p className="card-text">IP: {ip}</p>
          <p className="card-text">Port: {port}</p>
          <p className="card-text">
            Status:&nbsp;
            {status === 'online' ? (
              <span className="text-green-600">Online</span>
            ) : (
              <span className="text-orange-500">Pending</span>
            )}
          </p>
        </div>
      </Link>
    </div>
  );
}

function AddInstanceForm({
  setInstances,
}: {
  setInstances: React.Dispatch<React.SetStateAction<ClusterMember[]>>;
}) {
  function postChange() {
    const [name, port, knownServerIp, knownServerPort] = [
      document.getElementById('name') as HTMLInputElement,
      document.getElementById('port') as HTMLInputElement,
      document.getElementById('knownServerIp') as HTMLInputElement,
      document.getElementById('knownServerPort') as HTMLInputElement,
    ];
    fetch('/api/createNewNode', {
      method: 'POST',
      body: JSON.stringify({
        port: parseInt(port.value),
        name: name.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error != 'OK') {
          // TODO
        } else {
          addLocalInstance({
            name: name.value,
            port: parseInt(port.value),
            ip: '127.0.0.1',
            id: data.id,
            status: 'pending',
          });
          setInstances(getLocalInstances());
          fetch('api/letMeIn', {
            method: 'POST',
            body: JSON.stringify({
              knownServerIp: knownServerIp.value,
              knownServerPort: parseInt(knownServerPort.value),
              id: data.id,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.error != 'OK') {
                // TODO
              }
            });
        }
      });
  }

  return (
    <form method="dialog" className="modal-box">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        ✕
      </button>
      <h3 className="font-bold text-lg">Add an Instance Here</h3>
      <div>
        <label
          htmlFor="name"
          className="text-gray-700 font-semibold mb-2 block"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
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
          type="number"
          id="port"
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-primary"
        />
      </div>
      <div>
        <label
          htmlFor="knownServerIp"
          className="text-gray-700 font-semibold mb-2 block"
        >
          Known Server IP
        </label>
        <input
          type="text"
          id="knownServerIp"
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-primary"
        />
      </div>
      <div>
        <label
          htmlFor="knownServerPort"
          className="text-gray-700 font-semibold mb-2 block"
        >
          Known Server Port
        </label>
        <input
          type="number"
          id="knownServerPort"
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-primary"
        />
      </div>
      <div className="modal-action">
        <button className="btn btn-primary" type="submit" onClick={postChange}>
          Submit
        </button>
      </div>
    </form>
  );
}

function AddInstance({
  setInstances,
}: {
  setInstances: React.Dispatch<React.SetStateAction<ClusterMember[]>>;
}) {
  return (
    <div className="card h-56 flex justify-center items-center">
      <button
        className="btn btn-primary"
        onClick={() => (window as any).addInstance.showModal()}
      >
        Add an instance
      </button>
      <dialog id="addInstance" className="modal">
        <AddInstanceForm setInstances={setInstances} />
      </dialog>
    </div>
  );
}

function getLocalInstances() {
  return JSON.parse(localStorage.getItem('instances') || '[]');
}

function addLocalInstance({
  name,
  ip,
  port,
  status,
  id,
}: {
  name: string;
  ip: string;
  port: number;
  status: string;
  id: string;
}) {
  localStorage.setItem(
    'instances',
    JSON.stringify([
      ...getLocalInstances(),
      {
        name,
        ip,
        port,
        status,
        id,
      },
    ])
  );
}

function rewriteLocalInstance(instances: ClusterMember[]) {
  localStorage.setItem('instances', JSON.stringify(instances));
}

export default function Instances({
  response,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [instances, setInstances] = useState<ClusterMember[]>([]);
  const [members, setMembers] = useState<ClusterMember[]>(response.members);

  const updateMember = () => {
    fetch('/api/cluster')
      .then((res) => res.json())
      .then((data) => {
        if (data.error != 'OK') {
          // TODO
        } else {
          setMembers(data.members);
          setInstances((prev) => {
            const newLocalInstances = prev.map((instance) => {
              const member = members.find((member) => member.id === instance.id);
              if (member) {
                return member;
              } else {
                return instance;
              }
            });
            console.log(newLocalInstances);
            rewriteLocalInstance(newLocalInstances);
            return newLocalInstances;
          });
        }
      });
  };
  useEffect(() => {
    setInstances(getLocalInstances());
    updateMember();
    const interval = setInterval(updateMember, 5000);
    return () => clearInterval(interval);
  }, []);

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
                status={instance.status}
                key={instance.id}
              />
            ))}
            <AddInstance setInstances={setInstances} />
          </div>
        </div>
      </div>
    </>
  );
}
