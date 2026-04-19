import { useEffect, useState } from "react";
import "./styles/tailwind.css";
import AOS from "aos";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Body from "./components/layout/Body";
import topright from "./assets/kback-khmer/position/top-right.png";
import bottomright from "./assets/kback-khmer/position/bottom-right.png";

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const covers = [
    "https://images.unsplash.com/photo-1470019903270-8f285e50ddd9?q=80&w=1810&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1524756614325-ab25ba59e6e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1646733664215-8ed78bc93968?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1447798451861-0bc763df1c5e?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1610963566222-1837b2728b02?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1603449139781-7c5de9d12393?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1545845408-d4f4d8365515?q=80&w=1850&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80",
    "https://images.pexels.com/photos/388415/pexels-photo-388415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/632522/pexels-photo-632522.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1108701/pexels-photo-1108701.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/19063440/pexels-photo-19063440/free-photo-of-forest-around-angkor-wat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/19063439/pexels-photo-19063439/free-photo-of-drone-shot-of-angkor-wat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/15890624/pexels-photo-15890624/free-photo-of-panoramic-view-of-angkor-wat-reflecting-in-water.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];
  var [currentImg, setCurrentImg] = useState(covers[0]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImg(covers[Math.floor(Math.random() * covers.length)]);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen">
      {/* <img
        src={currentImg}
        className="h-full w-full object-cover absolute -z-10"
      /> */}
      <Header />
      <Body />
      {/* <Footer /> */}
    </div>
  );
};

export default App;
