import Image from "next/image";
import Login from "../components/auth/Login";

const LoginPage = () => {
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex-col items-center">
          <Image
            className="mx-auto mb-5 h-[100px] w-[100px]"
            src="logo.png"
            alt="Picture of the author"
            width={500}
            height={500}
            unoptimized
          />
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in
          </h2>
          <Login />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
