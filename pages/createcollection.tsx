import React, { ChangeEvent, useState } from "react";
import Processing from "../src/components/Processing";
import ToastError from "../src/components/ToastError";
import ToastSucess from "../src/components/ToastSucess";
import useCreateCollection from "../src/hooks/useCreateCollection";
const Moralis = require("moralis");

const CreateCollection = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [formInput, updateFormInput] = useState({
    name: "Name",
    description: "",
  });
  const [isSuccess, setisSuccess] = useState(false);
  const [isError, setisError] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [saveFile, create] = useCreateCollection();

  const success = () => {
    setImgUrl("");
    updateFormInput({ name: "", description: "" });
    setProcessing(false);
    if (!isSuccess) {
      setisSuccess(true);
      setTimeout(function () {
        setisSuccess(false);
      }, 5000);
    }
  };
  const submitCollection = async () => {
    const { name, description } = formInput;
    setProcessing(true);
    const result = await create({
      name,
      description,
      imgUrl,
      callback: success,
    });
    if (!result) {
      setProcessing(false);
      if (!isError) {
        setisError(true);
        setTimeout(function () {
          setisError(false);
        }, 5000);
      }
    }
  };

  return (
    <div className="mt-10">
      <Processing isOpen={processing} />
      {isSuccess && <ToastSucess isOpen={isSuccess} toggle={setisSuccess} />}
      {isError && <ToastError isOpen={true} toggle={setisError} />}
      <div className="mx-auto mt- w-1/2 bg-gray-200 py-4 rounded-xl">
        <div className="p-8 pl-14 text-center">
          <p className="text-5xl font-bold my-5 ">Create New Collection</p>
          <div className="mt-10">
            <label className="mt-12 text-2xl label">Collection Name</label>
            <div className="">
              <input
                className="rounded mt-3 pl-1 bg-inherit border-b-2 border-b-white"
                type="text"
                onChange={(e) =>
                  updateFormInput({ ...formInput, name: e.target.value })
                }
              />
            </div>
            <div className="mt-12 text-2xl">
              <label className="">Description</label>
              <div className="">
                <input
                  className="rounded mt-3 pl-1 bg-inherit border-b-2 border-b-white"
                  onChange={(e) =>
                    updateFormInput({
                      ...formInput,
                      description: e.target.value,
                    })
                  }
                ></input>
              </div>
            </div>
            <button
              className="mt-10 bg-primary text-white rounded-lg text-2xl p-4 hover:drop-shadow"
              onClick={submitCollection}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCollection;
