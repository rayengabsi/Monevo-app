import { AuthContextType, UserType } from "@/types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, firestore } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter, useSegments } from "expo-router";
import { View, Text } from "react-native";

const authContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  // Handle Firebase auth state changes
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("firebaseUser", firebaseUser);

      if (firebaseUser) {
        // Update user state
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
        });
        
        // Optionally update user data from Firestore
        await updateUserData(firebaseUser.uid);
      } else {
        setUser(null);
      }
      
      // Auth state is now determined
      setIsLoading(false);
    });

    return () => unsub();
  }, []);

  // Handle navigation based on auth state
 useEffect(() => {
  if (isLoading) return; // wait until Firebase state is resolved

  const inTabsGroup = segments[0] === "(tabs)";
  const inAuthGroup = segments[0] === "(auth)" || segments[0] === "welcome";

  console.log("Navigation check:", { user: !!user, inTabsGroup, inAuthGroup, segments });

  if (user && !inTabsGroup) {
    // Logged in but outside protected routes → go to home
    router.replace("/(tabs)");
  } else if (!user && inTabsGroup) {
    // Not logged in but inside protected routes → go back to welcome
    router.replace("/welcome");
  }
}, [user, segments, isLoading]);

  const login = async (email: string, password: string): Promise<{ success: boolean; msg?: string }> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      if (error.code === 'auth/user-not-found') {
        msg = 'No user found with this email';
      } else if (error.code === 'auth/wrong-password') {
        msg = 'Incorrect password';
      } else if (error.code === 'auth/invalid-email') {
        msg = 'Invalid email address';
      } else if (error.code === 'auth/invalid-credential') {
        msg = 'Invalid email or password';
      }
      return { success: false, msg };
    }
  };

  const register = async (email: string, password: string, name: string): Promise<{ success: boolean; msg?: string }> => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(firestore, "users", response.user.uid), {
        name,
        email,
        uid: response.user.uid,
        createdAt: new Date().toISOString(),
      });
      return { success: true };
    } catch (error: any) {
      let msg = error.message;
      if (error.code === 'auth/email-already-in-use') {
        msg = 'Email is already registered';
      } else if (error.code === 'auth/weak-password') {
        msg = 'Password should be at least 6 characters';
      } else if (error.code === 'auth/invalid-email') {
        msg = 'Invalid email address';
      }
      return { success: false, msg };
    }
  };

  const logout = async (): Promise<{ success: boolean; msg?: string }> => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error: any) {
      console.error("Logout error:", error);
      return { success: false, msg: error.message };
    }
  };

  const updateUserData = async (uid: string): Promise<void> => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData: UserType = {
          uid: data.uid,
          email: data.email || null,
          name: data.name || null,
          image: data.image || null,
        };
        setUser(userData);
      }
    } catch (error: any) {
      console.error("Error fetching user data:", error);
    }
  };

  // Show loading screen while initializing
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F8F9FA' }}>
        <Text style={{ fontSize: 18, color: '#666' }}>Loading...</Text>
      </View>
    );
  }

  const contextValue: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateUserData,
    setUser,
  };

  return <authContext.Provider value={contextValue}>{children}</authContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};