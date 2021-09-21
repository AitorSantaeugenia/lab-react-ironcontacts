// src/App.js
import './App.css';
// Importing contacts | Hay un total de 52, mejor hacer -5 y que no nos imprima los 5 primeros
import contacts from './contacts.json';
//importing useState
import { useState } from 'react';

//Function to show only 5 contacts
const actorsFiveMax = contacts.splice(0, 5); //??? -> not working properly?

function App() {
	//const and variables, and hooks
	const [ actors, setActors ] = useState(actorsFiveMax);
	let copyArray = [ ...actors ];

	//Functions arrow ---------------------------------------------------------
	//Function that adds a random contact at the start, and prevents to keep adding
	const addRandomContact = () => {
		//5 primeros no
		let randomContact = contacts[Math.floor(Math.random() * contacts.length) + 5];
		//Pillamos el valor si está o no
		let existIn = contacts.indexOf(randomContact);
		//console.log(existIn);

		//unshift first position (add at first)
		if (randomContact) {
			copyArray.unshift(randomContact);
		}
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
		//or -1 if it is not present. to not repeat
		if (existIn > -1) {
			contacts.splice(existIn, 1);
		}

		setActors(copyArray);
	};

	//Function that sorts by popularity
	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
	const sortByPopularity = () => {
		copyArray.sort(function(a, b) {
			return b.popularity - a.popularity;
		});
		setActors(copyArray);
	};

	//Function that sorts by name
	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
	const sortByName = () => {
		copyArray.sort((a, b) => a.name.localeCompare(b.name));
		setActors(copyArray);
	};

	//Function that deletes the actor
	const deleteActor = (actorID) => {
		//console.log(actorID);
		const actorsNoDeleted = actors.filter((actor) => {
			return actor.id !== actorID;
		});
		setActors(actorsNoDeleted);
	};
	//console.log(actorsList);
	return (
		<div className="App">
			<div className="tableDiv">
				<h1>IronContacts</h1>
				<div>
					<button onClick={addRandomContact} className="btn">
						Add Random Contact
					</button>
					<button onClick={sortByPopularity} className="btn">
						Sort by popularity
					</button>
					<button onClick={sortByName} className="btn btn-danger">
						Sort by name
					</button>
				</div>

				<table className="tableActors">
					<thead>
						<tr>
							<th> Picture </th>
							<th> Name </th>
							<th> Popularity </th>
							<th> Won Oscar</th>
							<th> Won Emmy</th>
						</tr>
					</thead>
					<tbody>
						{actors.map((actor) => {
							return (
								<tr key={actor.id}>
									<td>
										<img src={actor.pictureUrl} width="100px" height="120px" alt="Actor" />
									</td>
									<td> {actor.name} </td>
									{/* Number.toFixed para redondear */}
									<td> {Number(actor.popularity).toFixed(2)}</td>
									<td>{actor.wonOscar ? '🏆' : ''}</td>
									<td>{actor.wonEmmy ? '🏆' : ''}</td>
									<td>
										<button
											onClick={() => {
												deleteActor(actor.id);
											}}
											className="btn btn-danger"
											id={actor.id}
										>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default App;
