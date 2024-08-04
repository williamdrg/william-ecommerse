import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Provider } from 'react-redux'
import store from './store/index.js'
import { LoadingProvider } from './contexts/LoadingContext.jsx'
library.add(fas);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <LoadingProvider>
          <App />
        </LoadingProvider>
      </HashRouter>
    </Provider>
  </React.StrictMode>,
)
