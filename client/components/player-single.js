import React from 'react'

const PlayerSingle = props => {
	const {data, handleClick} = props;
	return (
		<div>
			<h3 style={{display: "inline-block"}}>{data}</h3>
			<button type="button" onClick={(event) => handleClick(event, data)}>Remove</button>
		</div>
	)
}

export default PlayerSingle
