import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Admin from './Components/Admin/Admin';
import Checkout from './Components/Checkout/Checkout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import ManageBooks from './Components/ManageBooks/ManageBooks';
import Nav from './Components/Nav/Nav';
import NotFound from './Components/NotFound/NotFound';
import Orders from './Components/Orders/Orders';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
export const UserContext = createContext();
function App() {
    const [loggedInUser, setLoggedInUser] = useState({});
    const [user, setUser] = useState({});
    const firebaseConfig = {
        apiKey: 'AIzaSyCUIatsXIMrVHGBooJABgWQcK38vzsTPK8',
        authDomain: 'book-shelf-4c0d0.firebaseapp.com',
        projectId: 'book-shelf-4c0d0',
        storageBucket: 'book-shelf-4c0d0.appspot.com',
        messagingSenderId: '364028137866',
        appId: '1:364028137866:web:20943bb4dd5c9f0a67b873',
        measurementId: 'G-R08CLZ0XR0',
    };
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    return (
        <div className='App h-full '>
            <UserContext.Provider
                value={[loggedInUser, setLoggedInUser, user, setUser]}
            >
                <Router>
                    <div>
                        <Nav></Nav>

                        {/* <hr /> */}

                        <Switch>
                            <Route exact path='/'>
                                <Home />
                            </Route>
                            <PrivateRoute path='/admin'>
                                <Admin />
                            </PrivateRoute>
                            <PrivateRoute path='/order'>
                                <Orders />
                            </PrivateRoute>
                            <Route path='/login'>
                                <Login></Login>
                            </Route>
                            <PrivateRoute path='/book/:bookId'>
                                <Checkout></Checkout>
                            </PrivateRoute>
                            <Route path='*'>
                                <NotFound></NotFound>
                            </Route>
                        </Switch>
                    </div>
                </Router>
            </UserContext.Provider>
        </div>
    );
}

export default App;
