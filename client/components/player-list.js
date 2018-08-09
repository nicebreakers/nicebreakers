import React from 'react'
import {PlayerSingle} from '../components'

const PlayerList = props => {
	const tempData = ["email1@email.com", "email2@email.com", "email3@email.com", "email4@email.com", "email5@email.com"]
	return (
		<div>
			{tempData.map((singleEmail, index) => <PlayerSingle key={index} data={singleEmail} />)}
		</div>
	)
}

export default PlayerList
