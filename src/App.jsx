import React, { useEffect, useReducer, useRef } from "react";
import { useState } from "react";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import {
    userContext,
    displayContext,
    messageContext,
    AllUsersContext,
    NotificationContext,
    PostContext,
    EffectContext,
    ViewContext,
    SwiperContext
} from "./context/context";
import LoaderBg from "./components/LoaderBg";
import db from './firebase/firebaseConfig'
import { onSnapshot, collection, doc } from "firebase/firestore";
import Auth from "./components/Auth";
import CreateUser from "./components/CreateUser";
import { useAuth } from './hooks/useAuth';


const initial = {
    loading: true,
    error: '',
    userList: [],
    user: null,
    allMessage: [],
    posts: [],
    notifications: []

}

function reducer(state, action) {
    switch (action.type) {
        case "allMessage":
            return {
                ...state,
                loading: false,
                error: '',
                allMessage: action.payload,
            }
        case "userList":
            return {
                ...state,
                loading: false,
                error: '',
                userList: action.payload,
            }
         case "posts":
            return {
                ...state,
                loading: false,
                error: '',
                posts: action.payload,
            }
         case "notifications":
            return {
                ...state,
                loading: false,
                error: '',
                notifications: action.payload,
            }
        case 'user':
            return {
                ...state,
                loading: false,
                error: '',
                user: action.payload,
            }
        case "error":
            return {...state, error: 'Error fetching data ' + action.payload }
    }
}

function App() {
    const [active, setActive] = useState(1);
    const [selectedChat, setSelectedChat] = useState(null);
    const [data, dispatch] = useReducer(reducer, initial);
    const [isOnline, setIsOnline] = useState(window.navigator.onLine);
    const { loading, currentUser, isLoggedIn } = useAuth();
    const usersCollection = collection(db, "users");
    const [isNewUser, setISNewUser] = useState(false)
    const [view, setView] = useState('');
    const [showNav, setShowNav] = useState(true);
    const swiperRef = useRef();




    useEffect(() => {
    window.addEventListener('resize', handleWidth);
    window.addEventListener('DOMContentLoaded', handleWidth);
    return () => {
      window.removeEventListener('DOMContentLoaded', handleWidth);
      window.removeEventListener('resize', handleWidth);
    }
    }, [view]);
    
    function handleWidth() {
        if (window.innerWidth < 768) {
            if (selectedChat) {
            setView('message');
            }
            else {
                 setView('chats');
            }
    } 
    else setView('');
  }


    useEffect(() =>
        onSnapshot(collection(db, 'users'), (snapshot) => {
            dispatch({
                type: 'userList',
                payload: snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            });
          },
            error => dispatch({ type: 'error', payload: `Error: ${error}` })
        ),
        []
    );

    useEffect(() =>
        onSnapshot(collection(db, 'messages'), (snapshot) => {
            dispatch({
                type: 'allMessage',
                payload: snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            });
          },
            error => dispatch({ type: 'error', payload: `Error: ${error}` })
        ),
        []
    );


    useEffect(() =>
        onSnapshot(collection(db, 'posts'), (snapshot) => {
            dispatch({
                type: 'posts',
                payload: snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            });
          },
            error => dispatch({ type: 'error', payload: `Error: ${error}` })
        ),
        []
    );

    useEffect(() =>
        onSnapshot(collection(db, 'notifications'), (snapshot) => {
            dispatch({
                type: 'notifications',
                payload: snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            });
          },
            error => dispatch({ type: 'error', payload: `Error: ${error}` })
        ),
        []
    );

    useEffect(() => {
        function handleOnline() {
            setIsOnline(true)
        }

        function handleOffline() {
            setIsOnline(false)
        }

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        }
    });

    useEffect(() => {
        if (isLoggedIn && currentUser !== null) {
            const docRef = doc(usersCollection, currentUser.uid);
            const unsubscribe = onSnapshot(docRef, (doc) => {
                if (doc.exists && doc.data().username) { 
                    dispatch({ type: 'user', payload: { ...doc.data(), id: doc.id } })
                    setISNewUser(false)
                }
                else {
                    setISNewUser(true);
                }
            },
            error => dispatch({ type: 'error', payload: `Error: ${error}` }))
            return () => unsubscribe();
        }
    }, [isLoggedIn]);

    
    

     if (!isLoggedIn || currentUser === null) {
        return <Auth />
    }

    if (isNewUser) {
        return <CreateUser />
    }


    if (data.loading || loading) {
        return <div className="flex h-[100vh] w-[100vw] bg-gray-200"><LoaderBg>Loading...</LoaderBg></div>
    }

    if (data.error) {
        return <div className="flex items-center justify-center text-xl bg-gray-200">{ data.error }</div>
    }

    if (!isOnline) {
         return <div className="flex h-[100vh] w-[100vw] bg-gray-200"><LoaderBg>You need to be online to use this app</LoaderBg></div>
    }

  if (!data.loading && !data.error && isOnline) {
        return (
            <div className='bg-gray-100 dark:bg-dark max-w-[100vw] max-h-[100vh] overflow-hidden text-darkLight dark:text-light h-[100vh]'>
                <userContext.Provider value={data.user} >
                    <displayContext.Provider value={{ active, setActive }}> 
                        <messageContext.Provider value={ data.allMessage  }>
                            <AllUsersContext.Provider value={data.userList}>
                                <PostContext.Provider value={data.posts}>
                                    <NotificationContext.Provider value={data.notifications}>
                                        <EffectContext.Provider value={{ selectedChat, setSelectedChat }}>
                                            <ViewContext.Provider value={{ view, setView, showNav, setShowNav }}>
                                                <Header />
                                                <div className="flex flex-col md:flex-row">
                                                    <SwiperContext.Provider value={swiperRef}>
                                                         <Navbar />
                                                         <Main />
                                                    </SwiperContext.Provider>
                                                </div>
                                            </ViewContext.Provider>
                                        </EffectContext.Provider>
                                    </NotificationContext.Provider>
                                </PostContext.Provider>
                            </AllUsersContext.Provider>
                        </messageContext.Provider>
                    </displayContext.Provider>
                </userContext.Provider>
            </div>
       )
    }
}

export default App

 
                        
