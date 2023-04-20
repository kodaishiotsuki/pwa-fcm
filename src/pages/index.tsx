import { notifyMe } from "@/utils/notify";
import { NextPage } from "next";

const Home: NextPage = () => {
  return <button onClick={notifyMe}>Click me to get a notification</button>;
};

export default Home;
