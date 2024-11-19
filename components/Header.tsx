import Link from "next/link";
import { AiFillPlusCircle } from "react-icons/ai";
interface HeaderProps {
  addTask: () => void;
}
function Header(props: HeaderProps) {
  return (
    <header className="bg-[#F9D69E] drop-shadow-lg mb-4 sticky top-0">
      <nav className="mx-auto flex  items-center justify-between p-6">
        <div className="flex lg:flex-1">
          <Link href={"/"} className="font-semibold text-gray-700 text-lg">
            <span>To-Do App</span>
          </Link>
        </div>
        <button className="text-gray-700" onClick={props.addTask}>
          <AiFillPlusCircle size={30} />
        </button>
      </nav>
    </header>
  );
}

export default Header;
