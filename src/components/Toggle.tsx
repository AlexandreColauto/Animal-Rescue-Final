import { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
interface callback {
  callback: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function CustomLabelExample(props: callback) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    callProps();
  }, [enabled]);

  const callProps = () => {
    props.callback(enabled);
  };
  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? "bg-[#63add7]" : "bg-[#63add7]"
          } relative inline-flex items-center  h-14 rounded-full w-[150px] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          <span
            className={`${
              enabled
                ? "translate-x-[5.6rem] w-[3.6rem]"
                : "translate-x-1 w-[5.6rem]"
            } inline-block  h-12 transform bg-white rounded-full transition-transform`}
          />
          <div className="absolute w-full">
            <div className="flex justify-center">
              <p
                className={`${!enabled ? "text-[#708496]" : "text-white"} mr-4`}
              >
                Collection{" "}
              </p>
              <p
                className={`${enabled ? "text-[#708496]" : "text-white"} mr-1`}
              >
                {" "}
                NFT{" "}
              </p>
            </div>
          </div>
        </Switch>
      </div>
    </Switch.Group>
  );
}
