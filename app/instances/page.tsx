'use client';

import Link from 'next/link';

function InstanceCard({ name, id }: { name: string; id: string }) {
  return (
    <div className="card bg-gray-300 shadow-xl">
      <Link href={`/home?id=${id}`} className="h-full">
        <div className="card-body">
          <h1 className="card-title">{name}</h1>
          <p className="card-text">Instance id: {id}</p>
          <p className="card-text">IP: 127.0.0.1</p>
          <p className="card-text">
            Port: 2333
          </p>
        </div>
      </Link>
    </div>
  );
}

function AddInstance() {
  return (
    <div className="card flex justify-center items-center">
      <button
        className="btn bg-blue-300"
        onClick={() => (window as any).addInstance.showModal()}
      >
        Add an instance
      </button>
      <dialog id="addInstance" className="modal">
        <form method="dialog" className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <h3 className="font-bold text-lg">Add an Instance Here</h3>
          <p className="py-4">Comming soon...</p>
          <div className="modal-action">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default function Instances() {
  return (
    <>
      <div className="card h-4/5 w-4/5 bg-gray-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title">Instances</h1>
          <div className="h-full w-full grid grid-cols-4 gap-8 p-1">
            <InstanceCard name="Instance 1" id="1" />
            <InstanceCard name="Instance 2" id="2" />
            <InstanceCard name="Instance 3" id="3" />
            <InstanceCard name="Instance 4" id="4" />
            <InstanceCard name="Instance 5" id="5" />
            <InstanceCard name="Instance 6" id="6" />
            <AddInstance />
          </div>
        </div>
      </div>
    </>
  );
}
