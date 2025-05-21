export default function Sidebar() {
  return (
    <div className="bg-white rounded-2xl">
      <h1 className="text-5xl font-extrabold leading-tight">AI</h1>
      <h2 className="italic text-3xl font-serif">&amp; Beyond</h2>
      <p className="text-gray-500 text-base leading-relaxed py-5">
        Exploring how global talent is shaping the future of AI, from anywhere.
      </p>
      <hr className="w-1/2 border-t-1 border-gray-200 my-4 ml-0" />
      <div>
        <ul>
          <li>
            <a href="#" className="text-black font-bold underline cursor-default text-base">Latest</a>
          </li>
        </ul>
      </div>
    </div>
  );
} 