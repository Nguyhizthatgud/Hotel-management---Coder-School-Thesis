"use client";
import React from "react";
import Headingpad from "./Headingpad";
import Service from "./Service";

type Props = {
  roomId?: string;
  roomName?: string;
};

const Userfrontfield = (props: Props) => {
  return (
    <section>
      {/* heading */}
      <Headingpad />
      <Service />

      {/* image hotel room showcase */}
    </section>
  );
};

export default Userfrontfield;
