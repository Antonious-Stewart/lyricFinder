import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../Context';

export default class Search extends Component {
	state = {
		trackTitle: ''
	};
	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};
	handleSubmit = (dispatch, e) => {
		e.preventDefault();
		axios
			.get(
				`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${
					this.state.trackTitle
				}&page_size=10&page=1&s_track_rating=desc&apikey=9c6dfe23a8e8a342e11223207b5bbbe6`
			)
			.then(res =>
				dispatch({
					type: 'SEARCH_TRACKS',
					payload: res.data.message.body.track_list
				})
			)
			.catch((err, res) => {
				console.log({ error: err.message, status: res.status });
			});
		this.setState({ trackTitle: '' });
	};
	render() {
		return (
			<Consumer>
				{value => {
					const { dispatch } = value;
					return (
						<div className='card card-body mb-4 p-4'>
							<h1 className='display-4 text-center'>
								{' '}
								<i className='fas fa-music' />
								Search for a song{' '}
							</h1>
							<p className='lead text-center'>Get the lyrics for any song</p>
							<form action='' onSubmit={this.handleSubmit.bind(this, dispatch)}>
								<div className='form-group'>
									<input
										type='text'
										className='form-control form-control-lg'
										placeholder='Song Title...'
										name='trackTitle'
										value={this.state.trackTitle}
										onChange={this.handleChange}
									/>
								</div>
								<button
									className='btn btn-block btn-dark btn-lg mb-5'
									type='submit'>
									Get Track Lyrics
								</button>
							</form>
						</div>
					);
				}}
			</Consumer>
		);
	}
}
