import Link from "next/link";
import { AiFillPlusCircle } from "react-icons/ai";
interface HeaderProps {
  addTask: () => void;
}
function Header(props: HeaderProps) {
  return (
    <header className="bg-blue-500 drop-shadow-lg mb-4 sticky top-0">
      <nav className="mx-auto flex  items-center justify-between p-6">
        <div className="flex lg:flex-1">
          <Link href={"/"} className="font-semibold text-white text-2xl">
            <span>To-Do App</span>
          </Link>
        </div>
        <button className="text-white" onClick={props.addTask}>
          <AiFillPlusCircle size={30} />
        </button>
      </nav>
    </header>
  );
}

export default Header;
