import axios from 'axios';
import styles from '../styles/Home.module.css';

function SinglePost({ post }) {
	return (
		<div className={styles.container}>
			<main className={styles.main}>
				<h1>{post?.title}</h1>
				<p>Post slug: {post?.id}</p>
				<p>{post?.body}</p>
			</main>
		</div>
	);
}

export default SinglePost;

export const getStaticProps = async ({ params }) => {
	try {
		const { data, errors } = await axios.get(
			`https://jsonplaceholder.typicode.com/posts/${params.id}`
		);

		if (errors || !data) {
			console.log(errors);
			return { notFound: true };
		}

		return {
			props: { post: data },
			revalidate: 10
		};
	} catch (err) {
		console.log(err);
		return { notFound: true };
	}
};

export const getStaticPaths = async () => {
	try {
		const { data, errors } = await axios.get(
			`https://jsonplaceholder.typicode.com/posts`
		);
		// console.log(data.slice(0, 5));
		const paths = data.map((post) => ({
			params: { id: post.id.toString() }
		}));

		if (errors || !data) {
			console.log(errors);
			return { notFound: true };
		}

		return {
			paths,
			fallback: 'blocking'
		};
	} catch (err) {
		console.log(err);
		return { notFound: true };
	}
};
