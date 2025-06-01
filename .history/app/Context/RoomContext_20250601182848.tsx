import React from "react";

type Props = {};

const RoomContext = (props: Props) => {
  return <div>RoomContext</div>;
};

export default RoomContext;
export type RoomContextType = {
  rooms: any[];
  setRooms: React.Dispatch<React.SetStateAction<any[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};
