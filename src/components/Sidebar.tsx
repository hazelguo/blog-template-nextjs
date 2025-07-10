type SidebarProps = {
  tags: string[];
  selectedTag: string | null;
  onTagClick: (tag: string | null) => void;
};

export default function Sidebar({ tags, selectedTag, onTagClick }: SidebarProps) {
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
            <button 
              onClick={() => onTagClick(null)}
              className={`text-base ${
                selectedTag === null 
                  ? 'text-black font-bold underline' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Latest
            </button>
          </li>
          {tags.map((tag) => (
            <li key={tag} className="mt-2">
              <button
                onClick={() => onTagClick(tag)}
                className={`text-base ${
                  selectedTag === tag 
                    ? 'text-black font-bold underline' 
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 