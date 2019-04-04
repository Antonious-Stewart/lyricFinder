import React, { Fragment } from 'react';
import Tracks from '../Tracks/Tracks';
import Search from '../Tracks/Search';

const Index = props => (
	<Fragment>
		<Search />
		<Tracks />
	</Fragment>
);

export default Index;
