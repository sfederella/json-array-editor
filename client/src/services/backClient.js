const backClient = {
	putJsonArrayAt: (json, index, next) => {
		fetch('/api/jsonarray/' + index, {
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
		fetch('/api/jsonarray/' + index)
		.then( async response => {
			var json = await response.json();
			next(json);
		});
	},
	getSize: (next) => {
		fetch('/api/size')
		.then( async response => {
			var json = await response.json();
			next(json);
		});
	}
}

export default backClient;