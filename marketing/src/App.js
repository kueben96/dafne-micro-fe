import React from 'react'
import { Link } from 'react-router-dom'

const App = () => {
    return (
        <div>
            <h1>Marketing App</h1>
            <Link to='/auth'>Link</Link>
        </div>
    )
}

export default App