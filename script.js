window.addEventListener('load', function() {
	let form = document.querySelector('form');
	form.addEventListener('submit', function(event) {
		let pilotName = document.querySelector('input[name=pilotName]');
		let copilotName = document.querySelector('input[name=copilotName]');
		let fuelLevel = document.querySelector('input[name=fuelLevel]');
		let cargoMass = document.querySelector('input[name=cargoMass]');
		let missionUpdate = document.getElementById('faultyItems');
		if (!pilotName.value || !copilotName.value || !fuelLevel.value || !cargoMass.value) {
			alert('All fields are required!');
			event.preventDefault();
		}
		if (isNaN(fuelLevel.value) || isNaN(cargoMass.value)) {
			alert('Fuel and Cargo must be numerals');
			event.preventDefault();
		}
		document.getElementById('pilotStatus').innerHTML = `Pilot ${pilotName.value} is ready for launch`;
		document.getElementById('copilotStatus').innerHTML = `Co-Pilot ${copilotName.value} is ready for launch`;
		let fuelStatus = document.getElementById('fuelStatus');
		let launchStatus = document.getElementById('launchStatus');
		let cargoStatus = document.getElementById('cargoStatus');
		console.log(pilotName.value, copilotName.value, fuelLevel.value, cargoMass.value);
		if (fuelLevel.value < 10000 || cargoMass > 10000) {
			missionUpdate.style = 'visibility: visible';
			launchStatus.style = 'color: red';
			launchStatus.innerHTML = 'SHUTTLE NOT READY FOR LAUNCH';
			fuelLevel.value <= 10000 ? (fuelStatus.innerHTML = 'Fuel level not high enough for launch') : null;
			cargoMass.value >= 10000 ? (cargoStatus.innerHTML = 'Cargo Mass too High for Liftoff') : null;
		}
		if (fuelLevel.value > 9999 || cargoMass < 9999) {
			missionUpdate.style = 'visibility: visible';
			launchStatus.style = 'color: green';
			launchStatus.innerHTML = 'SHUTTLE IS READY FOR LAUNCH';
			fuelLevel.value >= 10000 ? (fuelStatus.innerHTML = 'Fuel level is high enough for launch') : null;
			cargoMass.value <= 10000 ? (cargoStatus.innerHTML = 'Cargo Mass adequate for Liftoff') : null;
		}
		fetch('https://handlers.education.launchcode.org/static/planets.json').then(function(response) {
			//  const jsonPlanets = response.json.then(function(json);
			//  console.log(jsonPlanets);
			response.json().then(function(json) {
				//  console.log(json)
				planetRando = json[Math.floor(Math.random() * 6)];
				const div = document.getElementById('missionTarget');
				div.innerHTML = `
					  <h2>Mission Destination</h2>
						 <ol>
							 <li>Name: ${planetRando.name}</li>
							 <li>Diameter: ${planetRando.diameter}</li>
							 <li>Star: ${planetRando.star}</li>
							 <li>Distance from Earth: ${planetRando.distance}</li>
							 <li>Number of Moons: ${planetRando.moons}</li>
						 </ol>
						 <img src="${planetRando.image}">
				   `;
			});
		});
		event.preventDefault();
	});
});
