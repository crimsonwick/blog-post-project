export interface UserInterface {
    id?: string,
    email?: string,
    password?: string,
    resetLink?: string,
    createdAt?: string,
    updatedAt?: string
}

export interface SearchDataInterface {
    id?: string;
    userId?: string;
    title?: string;
    body?: string;
    image?: string;
    timetoRead?: number;
    createdAt?: string;
    updatedAt?: string;
    Posted_By?: {
            id : string;
            email: string;
            password: string;
            avatar : string;
            resetLink: string;
            createdAt: string;
            updatedAt: string;
          }
}

export interface AppContextInterface {
    dp: string;
    setDp: React.Dispatch<React.SetStateAction<string>>;
    setUserData: React.Dispatch<React.SetStateAction<UserInterface>>;
    userData: UserInterface | null;
    setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
    setRefreshToken: React.Dispatch<React.SetStateAction<string | null>>;
    accessToken: string | null;
    refreshToken: string | null;
    loggedIn: boolean | null;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    searchData: SearchDataInterface[] | undefined;
    setSearchData: React.Dispatch<React.SetStateAction<SearchDataInterface[]>>;
    searchMyData: SearchDataInterface[] | undefined;
    setSearchMyData: React.Dispatch<React.SetStateAction<SearchDataInterface[]>>;
    cursorPaginationLink: string;
    setCursorPaginationLink: React.Dispatch<React.SetStateAction<string>>;
}