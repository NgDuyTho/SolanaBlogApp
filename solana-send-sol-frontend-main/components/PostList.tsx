import { FC, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { getProgram } from '../utils/anchorProvider';
import styles from '../styles/Home.module.css';

export const PostList: FC = () => {
    const { wallet } = useWallet();
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        if (!wallet) return;

        const fetchPosts = async () => {
            const program = getProgram(wallet);
            try {
                const postAccounts = await program.account.postState.all();
                setPosts(postAccounts);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPosts();
    }, [wallet]);

    return (
        <div className={styles.postList}>
            {posts.map((post) => (
                <div key={post.publicKey.toString()} className={styles.postItem}>
                    <h3>{post.account.title}</h3>
                    <p>{post.account.content}</p>
                </div>
            ))}
        </div>
    );
};
