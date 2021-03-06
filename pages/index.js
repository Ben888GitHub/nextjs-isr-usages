import Head from 'next/head';
import Posts from '../components/Posts';
import styles from '../styles/Home.module.css';
import axios from 'axios';

export default function Home({ data }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>NextJS ISR</h1>
				<Posts posts={data} />
			</main>
		</div>
	);
}

export const getStaticProps = async () => {
	try {
		const { data, errors } = await axios.get(
			`https://jsonplaceholder.typicode.com/posts`
		);
		// console.log(data);
		if (errors || !data) {
			console.log(errors);
			return { notFound: true };
		}
		return {
			props: { data: data.slice(0, 10) },
			revalidate: 10
		};
	} catch (err) {
		console.log(err);
		return { notFound: true };
	}
};
