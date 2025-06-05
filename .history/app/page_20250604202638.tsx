import React from "react";
import Header from "./components/Header";
import Userfrontfield from "./components/UserFrontPage/Userfrontfield";
import Footer from "./components/Footer";
export default function Home() {
  return (
    <div className="">
      <header>
        <Header />
      </header>
      <main>
        <section className="container mx-auto lg:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:max-w-none max-w-sm lg:mx-0 mx-auto gap-4 p-4">
            <Userfrontfield />
          </div>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
