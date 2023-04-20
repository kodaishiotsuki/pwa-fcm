import { notifyMe } from "@/utils/notify";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={notifyMe}
      >
        Click me to get a notification
      </button>
    </div>
  );
};

export default Home;
