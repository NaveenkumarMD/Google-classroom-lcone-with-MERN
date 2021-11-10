import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../Reducers/index'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {composeWithDevTools} from 'redux-devtools-extension'
const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [thunk]

const initilaState = {

}

export const store = createStore(
    persistedReducer,
    initilaState,
    composeWithDevTools(applyMiddleware(...middleware))

)
export const persistor = persistStore(store)