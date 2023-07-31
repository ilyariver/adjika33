export default function getCities(query: string) {
	const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
	const token = '5685f6c5c87b8e1c6c32d4ae3832ab091cf4be09';

	const options: RequestInit = {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Token ' + token
		},
		body: JSON.stringify({query: query})
	}

	return fetch(url, options)
		.then(response => response.json())
		.then(result => result)
		.catch(error => console.log('error', error));
}
