import ReactDOM from 'react-dom'
import routes from './config/routes'
import { createStore } from 'redux'
import users from 'redux/modules/users'
import { Provider } from 'react-redux'

const store = createStore(users)
console.log(store)
console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app')
)
