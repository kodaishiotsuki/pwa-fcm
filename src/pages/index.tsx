import { useAuth } from "@/context/auth";
import { notifyMe } from "@/utils/notify";
import { NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const { fbUser, isLoading } = useAuth();

  if (!fbUser) {
    if (!isLoading) {
      router.push("/login");
    }
    return null;
  }
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
