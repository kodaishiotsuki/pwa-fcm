import Image from "next/image";
import { useState } from "react";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";

const LoginPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex-col items-center">
          <Image
            className="mx-auto mb-5 h-[100px] w-[100px]"
            src="vercel.svg"
            alt="Picture of the author"
            width={500}
            height={500}
            unoptimized
          />
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in
          </h2>

          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center">
              <label
                htmlFor="remember-me"
                className="ml-10 block text-sm text-gray-900"
              >
                Don’t have an account yet?
              </label>
            </div>
            <div className="mr-10 text-sm">
              <button
                className="font-medium text-green-700 hover:text-green-500"
                onClick={openModal}
                type="button"
              >
                Sign up here
              </button>
            </div>
          </div>

          <Login />
        </div>
      </div>
      <SignUp isOpen={isOpen} closeModal={closeModal} />
    </>
  );
};

export default LoginPage;
