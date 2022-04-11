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
    <div>
      <Processing isOpen={processing} />
      {isSuccess && <ToastSucess isOpen={isSuccess} toggle={setisSuccess} />}
      {isError && <ToastError isOpen={true} toggle={setisError} />}
      <div className="mx-auto mt-10 w-11/12 bg-slate-100 rounded-xl">
        <div className="p-8 pl-14">
          <p className="text-2xl font-bold my-4">Create New Collection</p>
          <label className="label">Collection Name</label>
          <div className="">
            <input
              className="rounded pl-1"
              type="text"
              placeholder="Crypto something..."
              onChange={(e) =>
                updateFormInput({ ...formInput, name: e.target.value })
              }
            />
          </div>
          <div className="mt-4">
            <label className="">Description</label>
            <div className="">
              <input
                className="pl-1 rounded"
                placeholder="Cute kitten"
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
            className="mt-4 bg-slate-200 rounded-lg p-2 hover:drop-shadow"
            onClick={submitCollection}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCollection;
