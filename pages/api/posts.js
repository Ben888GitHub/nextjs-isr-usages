import axios from 'axios';

export default async function handler(req, res) {
	try {
		const { data, errors } = await axios.get(
			'https://jsonplaceholder.typicode.com/posts'
		);

		if (errors || !data) {
			res.json({ errors });
		}
		await res.unstable_revalidate('/');
		return res.status(200).json(data.slice(0, 10));
	} catch (err) {
		console.log(err.response.status);
		const { status, statusText } = err.response;
		res.status(status).json(`Error ${status}, ${statusText}`);
	}
}
