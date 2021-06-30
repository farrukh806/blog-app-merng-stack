import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import './App.css';
import { AuthProvider } from './context/auth';
import Header from './components/Header';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Post from './Pages/Post';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Container style={{ marginTop: '2em' }}>
					<Header />
					<Route exact path='/' component={Home} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/register' component={Register} />
					<Route exact path='/posts/:id' component={Post} />
				</Container>
			</Router>
		</AuthProvider>
	);
}

export default App;
