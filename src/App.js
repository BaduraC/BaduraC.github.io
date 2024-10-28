import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Track from './components/Track';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/track">Track</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route exact path="/" component={Home} />
                    <Route path="/track" component={Track} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;