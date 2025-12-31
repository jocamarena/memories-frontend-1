import {Routes, Route, Navigate} from 'react-router';
import './App.css'
import {Navigation} from './components/Navigation';
import {ApodList} from './components/Apod/ApodList';
import {ApodListAxios} from './components/Apod/ApodListAxios';
import {ApodListReactQuery} from './components/Apod/ApodListReactQuery';
import {ApodListReactQuerySpring} from "./components/Apod/ApodListReactQuerySpring.tsx";

function App() {
    return (
        <>
            <Navigation/>
            <Routes>
                <Route path="/" element={<Navigate to="/fetch" replace/>}/>
                <Route path="/fetch" element={<ApodList/>}/>
                <Route path="/axios" element={<ApodListAxios/>}/>
                <Route path="/react-query" element={<ApodListReactQuery/>}/>
                <Route path="/react-query-spring" element={<ApodListReactQuerySpring/>}/>
            </Routes>
        </>
    )
}

export default App
