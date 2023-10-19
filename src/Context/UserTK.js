import { createContext, useState } from "react";


export let UserToken = createContext();

export default function UserTokenProvider(props) {
    let [userToken, setuserToken] = useState(null);

    return <UserToken.Provider value={{ userToken, setuserToken }}>
        {props.children}
    </UserToken.Provider>
}


