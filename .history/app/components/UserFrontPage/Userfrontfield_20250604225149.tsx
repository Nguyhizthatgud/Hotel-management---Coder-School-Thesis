import React from "react";
import Headingpad from "./Headingpad";
type Props = {
  roomId?: string;
  roomName?: string;
};

const Userfrontfield = (props: Props) => {
  return (
    <section className="container mx-auto lg:px-0">
      {/* heading */}
      <Headingpad />
      {/* image hotel room showcase */}
    </section>
  );
};

export default Userfrontfield;
