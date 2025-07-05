import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, UserType } from "@/types";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../(auth)/config/firebase";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useRouter } from "expo-router";

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const router = useRouter()
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: firebaseUser?.displayName
                });
                updateUserData(firebaseUser.uid);
                router.replace("/")
            } else{
                setUser(null);
                router.replace("/(auth)/welcome")
            }
        });
        return () => unsub();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error: any) {
            let msg = error.message;
            if(msg.includes("(auth/invalid-credential)")) msg= "Wrong Credentials"
            if(msg.includes("(auth/invalid-email)")) msg= "Invalid email"
            return { success: false, msg };
        }
    };

    const register = async (email: string, password: string) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(firestore, "users", response.user.uid), {
                email,
                uid: response.user.uid,
            });
            return { success: true };
        } catch (error: any) {
            let msg = error.message;
             if (msg.includes("(auth/email-already-in-use)")) msg = "This email is already in use";
             if (msg.includes("(auth/invalid-email)")) msg = "Invalid email";
            return { success: false, msg };
        }
    };

    const updateUserData = async (uid:string)=>{

        try {
            const docRef = doc(firestore,"users",uid);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()){
                const data = docSnap.data();
                const userData: UserType={
                    uid:data?.uid || null,
                    email: data?.email || null,
                    name:data?.name || null,
                    image: data?.image || null,
                }
                setUser({...userData});
            }
            
        } catch (error:any) {
            console.log("error: ", error);
        }

    };

    const contextValue : AuthContextType={
        user,
        setUser,
        login,
        register,
        updateUserData
    }

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    )

    
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}