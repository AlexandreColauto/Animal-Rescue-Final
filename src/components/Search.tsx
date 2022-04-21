import React, { useEffect, useState } from "react";
import Moralis from "moralis/types";

interface props {
  changeCollection: (collectionName: string) => void;
  collections: Moralis.Object<Moralis.Attributes>[];
}
interface dictionary {
  [key: string]: string;
}
function Search(props: props) {
  const [text, setText] = useState<string>("");
  const [filtered_collections, setFiltered_collections] = useState<
    Moralis.Object<Moralis.Attributes>[]
  >([]);
  const { changeCollection, collections } = props;
  const [colDictionary, setcolDictionary] = useState<dictionary>();
  function onChange(e: string) {
    if (!e) {
      console.log([]);
      setText("");
      changeCollection("All Collections");
      setFiltered_collections([]);
      return;
    }
    const collectionName = e;
    console.log(collectionName);
    const _colDictionary: dictionary = {};
    const results = collections.filter((collection) => {
      if (collection.get("name").toUpperCase().startsWith(e.toUpperCase())) {
        return true;
      }
      return false;
    });
    console.log(results);
    setFiltered_collections(results);
    setText(e);

  }

  const selectOption = (collectionName: string, collectionAddress: string) => {
    setText(collectionName);
    changeCollection(collectionAddress);
    setFiltered_collections([]);
  };

  return (
    <>
      <div className="relative border-2 border-gray-300 rounded-full w-2/4 mx-auto text-gray-600 bg-white mr-auto h-10 px-5 pr-16 text-sm focus:outline-none">
        <form>
          <input
            className=" w-1/2 bg-white mr-auto mt-2 px-5 pr-16 text-sm focus:outline-none"
            type="search"
            name="search"
            value={text}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Write the title of the collection"
          />

          <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
            <svg
              className="text-gray-600 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              xmlSpace="preserve"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </form>
        <div className="bg-white rounded mt-2">
          {filtered_collections.map((col, i) => (
            <p
              key={i}
              className="p-2 border cursor-pointer"
              onClick={() =>
                selectOption(col.get("name"), col.get("collectionAddress"))
              }
            >
              {col.get("name")}
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default Search;
