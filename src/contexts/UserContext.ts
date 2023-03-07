import { createContext } from "react";
import { User } from "../types/user";

const UserContext = createContext<{
    user: User | null;
    setUser: (user: User | null) => void;
}>({
    user: null,
    setUser: () => { }
})

export default UserContext;