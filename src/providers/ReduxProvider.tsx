import { Provider } from 'react-redux';
import store from 'reducers';

const ReduxProvider = props => <Provider store={store} {...props} />;

export default ReduxProvider;
