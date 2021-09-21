// src/App.js
import './App.css';
// Importing contacts
import contacts from './contacts.json';
//importing useState
import { useState } from 'react';

function App() {
	//contacts 5 max
	const contactsFiveMax = contacts.splice(0, 5);
	const [ actors ] = useState(contactsFiveMax);

	//console.log(contactsFiveMax);
	return (
		<div className="App">
			<div className="tableDiv">
				<h1>IronContacts</h1>

				{actors.map((actors) => {
					return (
						<table className="tableActors">
							<tr>
								<th> Picture </th>
								<th> Name </th>
								<th> Popularity </th>
								<th> Won Oscar</th>
								<th> Won Emmy</th>
							</tr>
							<tr>
								<td>
									{' '}
									<img src={actors.pictureUrl} width="80px" height="100px" alt="actorphoto" />{' '}
								</td>
								<td> {actors.name} </td>
								{/* Number.toFixed para redondear */}
								<td> {Number(actors.popularity).toFixed(2)}</td>
								<td>{actors.wonOscar ? '🏆' : ''}</td>
								<td>{actors.wonEmmy ? '🏆' : ''}</td>
							</tr>
						</table>
					);
				})}
			</div>
		</div>
	);
}

export default App;
