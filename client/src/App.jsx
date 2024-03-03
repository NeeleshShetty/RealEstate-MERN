import { BrowserRouter,Route,Routes } from "react-router-dom";
import Header from "./components/Header";
import About from "./pages/About";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
	  <BrowserRouter>
		  <Header />
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/about"
					element={<About />}
				/>
				
				<Route
					path="/sign-in"
					element={<SignIn />}
				/>
				<Route
					path="/sign-up"
					element={<Signup />}
				/>
				<Route element={<PrivateRoute />}>
				<Route
					path="/profile"
					element={<Profile />}
				/>
				</Route>
				
			</Routes>
		</BrowserRouter>
	);
}

export default App
