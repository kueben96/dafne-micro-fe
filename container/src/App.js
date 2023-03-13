import React from 'react'
import AuthApp from './components/AuthApp'
import MarketingApp from './components/MarketingApp'

const App = () => {
    return (
        <div>
            <h1>Hi there from DaFne Container</h1>
            <MarketingApp />
            <AuthApp />
        </div>
    )
}
export default App