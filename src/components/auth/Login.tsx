import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { auth, db } from "../../firebase/client";

const Login = () => {
  const router = useRouter();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).then((result) => {
      const ref = doc(db, `Users/${result.user.uid}`);
      setDoc(ref, {
        id: result.user.uid,
        name: result.user.displayName,
        imageUrl: result.user.photoURL,
      });
      router.push("/");
    });
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-3 shadow sm:rounded-lg sm:px-10">
        <div className="rounded-lg border border-slate-800 px-10 shadow hover:bg-gray-50">
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
