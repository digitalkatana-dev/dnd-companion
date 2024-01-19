import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { PaperProvider } from 'react-native-paper';
import { store, persistor } from './src/redux/rootStore';
import DNDCompanion from './src';

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<PaperProvider>
					<DNDCompanion />
				</PaperProvider>
			</PersistGate>
		</Provider>
	);
}
