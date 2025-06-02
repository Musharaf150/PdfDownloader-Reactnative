import { getAuth } from "@react-native-firebase/auth";
import PdfDownload from "./screens/pdfDownload/page";
import { useEffect, useState } from "react";
import Auth from "./screens/auth/page";

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
    <>
    {
        currUser ? 
        <PdfDownload/>
        :
        <Auth/>
    }
    </>
  );
};

export default App
