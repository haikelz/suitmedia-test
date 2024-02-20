import { BrowserRouter, Route, Routes } from "react-router-dom";
import Banner from "./components/banner";
import Header from "./components/header";
import ListPosts from "./components/list-posts";
import About from "./pages/about";
import Careers from "./pages/careers";
import Contact from "./pages/contact";
import Home from "./pages/home";
import Ideas from "./pages/ideas";
import Services from "./pages/services";
import Work from "./pages/work";

export default function App() {
  return (
    <BrowserRouter>
      <div className="w-full">
        <Header />
        <main className="w-full flex justify-center pb-4 items-center flex-col">
          <Banner />
          <ListPosts />
        </main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/ideas" element={<Ideas />} />
          <Route path="/services" element={<Services />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
