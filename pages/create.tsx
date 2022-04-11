import React, { useEffect, useState } from "react";
import Toggle from "../src/components/Toggle";
import CreateCollection from "./createcollection";
import Mint from "./mint";

function Create() {
  const [collection, setColection] = useState(false);
  useEffect(() => {
    console.log(collection);
  }, [collection]);
  return (
    <div className="w-full mt-6 pb-24">
      <div className="justify-items-center items-center flex flex-col">
        <p className="text-6xl font-bold">Create a New</p>
        <p className="text-6xl font-bold">Collection or Item</p>
      </div>
      <div className="justify-center flex mt-16">
        <Toggle callback={setColection} />
      </div>
      <div className="hidden"></div>
      {!collection ? <CreateCollection /> : <Mint />}
    </div>
  );
}

export default Create;
