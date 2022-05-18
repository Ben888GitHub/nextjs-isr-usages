import axios from 'axios';
import styles from '../styles/Home.module.css';
import Posts from '../components/Posts';
import { useState, useEffect } from 'react';

function ApiRoutePage() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		axios.get('/api/posts').then((r) => setPosts(r.data));
	}, []);

	return (
		<main className={styles.main}>
			<Posts posts={posts} />
		</main>
	);
}

export default ApiRoutePage;
