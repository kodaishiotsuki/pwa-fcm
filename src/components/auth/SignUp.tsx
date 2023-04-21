import { Dialog, Transition } from "@headlessui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { auth, db } from "../../firebase/client";
import { Auth } from "../../types/auth";

const SignUp = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: VoidFunction;
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Auth>();

  const singUp = async (data: Auth) => {
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((result) => {
        const ref = doc(db, `Users/${result.user.uid}`);
        setDoc(ref, {
          id: result.user.uid,
          name: result.user.displayName,
          imageUrl: result.user.photoURL,
        });
        reset({ email: "", password: "" });
        alert(`Hellow!!`);
        router.push("/");
        return closeModal();
      })
      .catch((e) => {
        alert(e.message);
        router.push("/login");
        reset({ email: "", password: "" });
      });
  };
  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-90" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h2"
                    className="text-center text-3xl font-bold tracking-tight text-gray-900"
                  >
                    Sign up
                  </Dialog.Title>
                  <div className="mt-2">
                    <form className="space-y-6" onSubmit={handleSubmit(singUp)}>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                          <span className="text-rose-500">*</span>
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            {...register("email", {
                              required: "Email is Required!!!",
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                              },
                            })}
                            className="block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                          />
                          {errors.email && (
                            <small className="text-red-500">
                              {errors.email.message}
                            </small>
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                          <span className="text-rose-500">*</span>
                        </label>
                        <div className="mt-1">
                          <input
                            id="password"
                            type="password"
                            autoComplete="off"
                            className="block w-full appearance-none rounded-md border px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            required={true}
                            {...register("password", {
                              required: "You must specify a password",
                              minLength: {
                                value: 6,
                                message:
                                  "Password must be more than 8 characters",
                              },
                              maxLength: {
                                value: 20,
                                message:
                                  "Password must be less than 20 characters",
                              },
                            })}
                          />
                          {errors.password && (
                            <small className="text-red-500">
                              {errors.password.message}
                            </small>
                          )}
                        </div>
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="flex w-full justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Sign in
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SignUp;
