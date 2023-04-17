import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { UseSelector } from './redux/app'
import NoPage from "./pages/NoPage"
import Chat from './pages/Chat'
import Login from './pages/Login'
import Layout from './pages/Layout'
import { Navigate } from 'react-router-dom'
import Support from './pages/Support'

function App() {
    const selector = UseSelector()

    const user = selector.getUser()

    console.log("App.jsx:: user: ", user)

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={!!user ? (user.id == "user1" ? <Navigate to="/chat" /> : (user.id === "support1" ? <Navigate to="/support" /> : (user.id === "admin1" ? <Navigate to="/admin" /> : <NoPage />))) : <Navigate to="/login" />} />
                    </Route>
                    <Route path="/support" element={<Layout>{!user ? <Navigate to="/login" /> : <Support />}</Layout>} />
                    <Route path="/chat" element={<Layout>{!user ? <Navigate to="/login" /> : <Chat />}</Layout>} />
                    <Route path="/login" element={<Layout>{!!user ? <Navigate to="/" /> : <Login />}</Layout>} />
                    <Route path="*" element={<NoPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App