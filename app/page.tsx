import React from "react";
import Header from "./components/Header";
import Userfrontfield from "./UserFrontPage/Userfrontfield";

import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="">
      <header>
        <Header />
      </header>
      <main>
        <Userfrontfield />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
