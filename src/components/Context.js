import React, { Component } from 'react';
import axios from 'axios';
const Context = React.createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case 'SEARCH_TRACKS':
			return {
				...state,
				track_list: action.payload,
				heading: 'Search Results'
			};
		default:
			return state;
	}
};
export class Provider extends Component {
	state = {
		track_list: [],
		heading: '',
		dispatch: action => this.setState(state => reducer(state, action))
	};
	componentDidMount() {
		axios
			.get(
				`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=25&country=ud&f_has_lyrics=1&apikey=9c6dfe23a8e8a342e11223207b5bbbe6`
			)
			.then(response => {
				this.setState({
					track_list: response.data.message.body.track_list,
					heading: `Top 25 Tracks`
				});
			})
			.catch(err =>
				console.log({
					error: err.message,
					status: err.status,
					info: { err }
				})
			);
	}
	render() {
		return (
			<Context.Provider value={this.state}>
				{this.props.children}
			</Context.Provider>
		);
	}
}

export const Consumer = Context.Consumer;
