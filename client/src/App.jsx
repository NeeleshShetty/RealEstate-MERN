import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { lazy, Suspense } from "react";

// Lazy load components
const About = lazy(() => import("./pages/About"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Signup = lazy(() => import("./pages/Signup"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const CreateListing = lazy(() => import("./pages/CreateListing"));
const UpdateListing = lazy(() => import("./pages/UpdateListing"));
const Listing = lazy(() => import("./pages/Listing"));
const Search = lazy(() => import("./pages/Search"));

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/search" element={<Search />} />
          <Route path="/listing/:listingId" element={<Listing />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/update-listing/:listingId" element={<UpdateListing />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
