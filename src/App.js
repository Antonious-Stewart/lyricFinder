import React, { Component, Fragment } from 'react';
import Navbar from './components/Layouts/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Index from './components/Layouts/Index';
import { Provider } from './components/Context';
import Lyrics from './components/Tracks/Lyrics';
import './App.css';

class App extends Component {
	render() {
		return (
			<Provider>
				<Router basename={process.env.PUBLIC_URL}>
					<Fragment>
						<Navbar />
						<div className='container'>
							<Switch>
								<Route exact path='/' component={Index} />
								<Route extact path='/lyrics/track/:id' component={Lyrics} />
							</Switch>
						</div>
					</Fragment>
				</Router>
			</Provider>
		);
	}
}

export default App;
