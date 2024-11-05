// this page.tsx is what gets displayed on the home page
import LikeButton from "./like-button";

function Header({ title }: { title: string }) {
  return (
    <h1 className="text-6xl text-blue-500 font-semibold font-sans mb-4">
      {title ? title : "Default title"}
    </h1>
  );
}

export default function HomePage() {
  const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"];

  return (
    <div className="flex flex-col items-center">
      <Header title="Develop. Preview. Ship." />
      <ul className="flex flex-col items-center gap-2">
        {names.map((name) => (
          <li
            key={name}
            className="bg-emerald-500 hover:bg-emerald-400/80 rounded-md  px-4 py-2 "
          >
            {name}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <LikeButton />
      </div>
    </div>
  );
}
