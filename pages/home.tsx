'use client';

import { useRouter } from 'next/router';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { IGetMessage, Message, getMessage } from './api/getMessage';
import { useState } from 'react';

export const getServerSideProps: GetServerSideProps<{
  response: IGetMessage;
}> = async () => {
  return { props: { response: getMessage() } };
};

function SendPost({ setMessages }: { setMessages: React.Dispatch<React.SetStateAction<Message[]>>; }) {
  const router = useRouter();

  function postBlog() {
    const content = document.querySelector('textarea')?.value;
    if (!content) {
      return;
    }
    fetch('/api/blogPost', {
      method: 'POST',
      body: JSON.stringify({
        blogContent: content,
        posterId: router.query.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error != 'OK') {
          // TODO
        } else {
          // update message
          fetch('/api/getMessage')
            .then((res) => res.json())
            .then((data) => {
              if (data.error != 'OK') {
                // TODO
              } else {
                setMessages(data.message);
              }
            }
          );
        }
      });
  }

  return (
    <div className="h-5/6 w-full p-4 justify-center border-b-2">
      <textarea
        className="textarea textarea-primary h-5/6 w-full resize-none"
        placeholder="Input your idea here..."
      ></textarea>
      <div className="h-1/6 w-full flex items-center justify-end">
        <button className="btn btn-primary btn-sm mt-1" onClick={postBlog}>
          Send
        </button>
      </div>
    </div>
  );
}

function Posts({ messages }: { messages: Message[] }) {
  return (
    <div className="min-h-2/3 w-full flex flex-col p-6 pt-8">
      {messages
        .filter((message) => message.type === 'normal')
        .map((message) => (
          <PostCard content={message.content} key={message.messageId} />
        ))}
    </div>
  );
}

function PostCard({ content }: { content: string }) {
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
        <p>{content}</p>
        {/* <div className="card-actions justify-end">
          <button className="btn btn-primary">Listen</button>
        </div> */}
      </div>
    </div>
  );
}

function InfoCard({
  title,
  child,
  scroll,
}: {
  title: string;
  child: React.ReactNode;
  scroll?: boolean;
}) {
  return (
    <div className="w-full flex justify-center items-center p-2">
      <div
        className={`card w-full h-full shadow-xl bg-base-200 ${
          scroll ? 'overflow-y-scroll' : ''
        }`}
      >
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
          <td className="border px-4 py-2">
            {ip}:{port}
          </td>
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
  function kickOffMember(id: string) {
    const {
      ip: targetServerIp,
      port: targetServerPort,
      id: targetServerId,
    } = members.find((member) => member.id === id)!;
    fetch('/api/GetHimOut', {
      method: 'POST',
      body: JSON.stringify({
        targetServerIp,
        targetServerPort,
        targetServerId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error != 'OK') {
          // TODO
        }
      });
  }

  const members = [
    { id: '1', name: 'Instance 1', ip: '127.0.0.1', port: '2333' },
    { id: '2', name: 'Instance 2', ip: '127.0.0.1', port: '2334' },
    { id: '3', name: 'Instance 3', ip: '127.0.0.1', port: '2335' },
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
          {members.map((member) => (
            <tr key={member.id}>
              <td className="border px-4 py-2">{member.name}</td>
              <td className="border px-4 py-2 flex justify-center">
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => kickOffMember(member.id)}
                >
                  kick
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SystemInfo({ messages }: { messages: Message[] }) {
  function acceptChange(id: string) {
    fetch('/api/acceptMemberChange', {
      method: 'POST',
      body: JSON.stringify({
        messageId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error != 'OK') {
          // TODO
        }
      });
  }

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
          {messages
            .filter((message) => message.type === 'memberChange')
            .map((message) => (
              <tr key={message.messageId}>
                <td className="border px-4 py-2">{message.content}</td>
                <td className="border px-4 py-2 flex justify-around">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => acceptChange(message.messageId)}
                  >
                    Accept
                  </button>
                  <button className="btn btn-error btn-sm">Reject</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Home({
  response,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [messages, setMessages] = useState<Message[]>(response.message);

  const router = useRouter();
  const { name, ip, port, id } = router.query as unknown as {
    name: string;
    ip: string;
    port: number;
    id: string;
  };

  return (
    <>
      <div className="h-full w-full bg-base-100 flex flex-row">
        <div className="h-full w-2/3 flex flex-col overflow-y-scroll bg-base-200">
          <div className="h-1/3 w-full flex flex-col bg-base-100">
            <div className="h-1/6 w-full flex items-center sticky top-0 bg-base-300">
              <button
                className="btn btn-outline btn-sm"
                onClick={() => window.history.back()}
              >
                Back
              </button>
              <h1 className="text-xl font-bold pl-2">Raft Community</h1>
            </div>
            <SendPost setMessages={setMessages} />
          </div>
          <Posts messages={messages} />
        </div>
        <div className="h-full w-1/3 grid grid-rows-3 grid-flow-col gap-4">
          <InfoCard
            title="Node Basic Info"
            child={<BasicInfo id={id} name={name} ip={ip} port={port} />}
          />
          <InfoCard title="Member List" scroll child={<MemberList />} />
          <InfoCard
            title="System Info"
            scroll
            child={<SystemInfo messages={messages} />}
          />
        </div>
      </div>
    </>
  );
}
