import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async' // Import HelmetProvider
import { store } from '@app/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <HelmetProvider>
                    <App />
                </HelmetProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)
