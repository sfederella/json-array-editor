const backClient = {
	putJsonArrayAt: (json, index, next) => {
		fetch('http://localhost:5000/api/jsonarray/' + index, {
			method: 'PUT',
			body: JSON.stringify(json),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		})
		.then( async response => {
			var json = await response.json();
			next(json);
		});
	},
	getJsonArrayAt: (index, next) => {
		fetch('http://localhost:5000/api/jsonarray/' + index)
		.then( async response => {
			var json = await response.json();
			next(json);
		});
	},
	getStatus: (next) => {
		fetch('http://localhost:5000/api/status')
		.then( async response => {
			var json = await response.json();
			next(json);
		});
	}
}

export default backClient;