function PostCard() {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl my-2">
      <figure><img src="/images/stock/photo-1494232410401-ad00d5433cfa.jpg" alt="Album"/></figure>
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

export default function Home() {
  return (
    <>
      <div className="h-full w-full bg-gray-100 flex flex-row">
        <div className="h-full w-2/3 flex flex-col">
          <div className="h-1/3 w-full flex flex-col">
            <div className="h-1/6 w-full flex items-center border-2">
              <h1 className="text-xl pl-2">Raft Community</h1>
            </div>
            <div className="h-5/6 w-full p-4 justify-center border-2">
              <textarea className="textarea textarea-primary h-5/6 w-full" placeholder="Input your idea here..."></textarea>
              <div className="h-1/6 w-full flex items-center justify-end">
                <button className="btn btn-primary btn-sm">Send</button>
              </div>
            </div>
          </div>
          <div className="h-2/3 w-full flex flex-col p-6 pt-8 overflow-scroll">
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
        <div className="h-full w-1/3 grid grid-rows-3 grid-flow-col gap-4">
          <div className="w-full bg-gray-300 flex justify-center items-center">
            <div>
              <p>IP: 127.0.0.1</p>
              <p>
                Port: 2333
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-300 flex justify-center items-center">
            Member List
          </div>
          <div className="w-full bg-gray-300 flex justify-center items-center">
            System Info
          </div>
        </div>
      </div>
    </>
  );
}