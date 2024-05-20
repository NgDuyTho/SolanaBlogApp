import { FC, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { getProgram } from '../utils/anchorProvider';
import styles from '../styles/Home.module.css';

export const UpdatePostForm: FC<{ postPublicKey: PublicKey }> = ({ postPublicKey }) => {
    const { publicKey, wallet } = useWallet();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const updatePost = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!publicKey || !wallet) {
            alert('Please connect your wallet!');
            return;
        }

        const program = getProgram(wallet);

        try {
            const tx = await program.methods.updatePost(title, content)
                .accounts({
                    postAccount: postPublicKey,
                    authority: publicKey,
                })
                .rpc();

            console.log('Transaction signature', tx);
        } catch (err) {
            console.error(err);
            alert('Transaction failed!');
        }
    };

    return (
        <div>
            {publicKey ? (
                <form onSubmit={updatePost} className={styles.form}>
                    <label htmlFor="title">Title:</label>
                    <input
                        id="title"
                        type="text"
                        className={styles.formField}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        className={styles.formField}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <button type="submit" className={styles.formButton}>Update Post</button>
                </form>
            ) : (
                <span>Connect Your Wallet</span>
            )}
        </div>
    );
};
