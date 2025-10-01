import { getAuth } from "@react-native-firebase/auth";
import PdfDownload from "./screens/pdfDownload/page";
import { useEffect, useState } from "react";
import Auth from "./screens/auth/page";
import { StripeProvider } from "@stripe/stripe-react-native";
import AfterpayCheckout from "./components/AfterpayCheckout";

const App = () => {
    const user = getAuth().currentUser;
    const [currUser, setCurrUser] = useState(user);

    useEffect(()=>{
        const unsubscribe = getAuth().onAuthStateChanged((user) => {
            setCurrUser(user);
        });

        return () => unsubscribe();
    }, [user])
    console.log("Current User: ", currUser);

  return (
    <StripeProvider
    publishableKey="pk_test_51SCyosFeNTJcvbj0K49ZLiYNFw1SWkY1rR156z9SzKHUF4W3J0xrBKStHPgjs1ndB64h2qhzuQGE5vcmgobUoFwO00gtgfdPBy">
    <>
    {
        currUser ? 
        // <PdfDownload/>
        <AfterpayCheckout/>
        :
        <Auth/>
    }
    </>
    </StripeProvider>
  );
};

export default App
