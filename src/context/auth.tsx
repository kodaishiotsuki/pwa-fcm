import {
  onAuthStateChanged,
  Unsubscribe,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../firebase/client";
import { User } from "../types/user";

type ContextType = {
  fbUser: FirebaseUser | null | undefined;
  isLoading: boolean;
  user: User | null | undefined;
};

const AuthContext = createContext<ContextType>({
  fbUser: undefined,
  isLoading: true,
  user: undefined,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [fbUser, setFbUser] = useState<FirebaseUser | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    let unsubscribe: Unsubscribe; //監視

    onAuthStateChanged(auth, (resultUser) => {
      unsubscribe?.();
      setFbUser(resultUser);
      setIsLoading(false);

      //ログインの判定
      if (resultUser) {
        const ref = doc(db, `Users/${resultUser.uid}`);
        onSnapshot(ref, (snap) => {
          setUser(snap.data() as User);
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ fbUser, isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
