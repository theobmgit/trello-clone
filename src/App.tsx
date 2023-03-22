import React from 'react';
import MainLayout from "./components/layouts/MainLayout";
import Home from "./pages/home";
import AppProvider from "./context/app-context";

function App() {
    return (
        <AppProvider>
            <MainLayout>
                <Home/>
            </MainLayout>
        </AppProvider>
    );
}

export default App;
