import { notifyMe } from "@/utils/notify";
import { NextPage } from "next";

const Home: NextPage = () => {
  return <button onClick={notifyMe}>通知表示</button>;
};

export default Home;
