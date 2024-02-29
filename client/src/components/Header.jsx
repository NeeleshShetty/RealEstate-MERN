import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
		<div className="bg-slate-200  shadow-md">
			<div className="flex justify-between items-center max-w-6xl mx-auto p-3">
				<h1 className="text-sm sm:text-xl font-bold flex flex-wrap">
					<span className="text-slate-500 ">Neel</span>
					<span className="text-slate-700 font-bold">Estate</span>
				</h1>
				<form className="bg-slate-100 p-3 rounded-lg flex items-center">
					<input
						type={'text'}
						placeholder="Search ..."
						className="border-none outline-none bg-transparent w-24 sm:w-64"
					/>
					<FaSearch className="text-slate-600 " />
				</form>
				<ul className="flex gap-4">
					<Link to={'/'}>
						<li className="hidden sm:inline text-slate-700 hover:underline">
							Home
						</li>
					</Link>
					<Link to={'/about'}>
						<li className="hidden sm:inline text-slate-700 hover:underline">
							About
						</li>
					</Link>
					<Link to={'/sign-in'}>
						<li className="hidden sm:inline text-slate-700 hover:underline">
							Sign In
						</li>
					</Link>
					
				</ul>
			</div>
		</div>
	);
}

export default Header