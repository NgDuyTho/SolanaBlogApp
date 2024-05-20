import { FC, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram } from '@solana/web3.js';
import { getProgram } from '../utils/anchorProvider';
import styles from '../styles/Home.module.css';

export const CreatePostForm: FC = () => {
    const { publicKey, wallet } = useWallet();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const createPost = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!publicKey || !wallet) {
            alert('Please connect your wallet!');
            return;
        }

        const program = getProgram(wallet);
        const newPostKeypair = Keypair.generate();

        try {
            const tx = await program.methods.createPost(title, content)
                .accounts({
                    postAccount: newPostKeypair.publicKey,
                    userAccount: publicKey,
                    blogAccount: publicKey, // Replace with actual blog account publicKey
                    authority: publicKey,
                    systemProgram: SystemProgram.programId,
                })
                .signers([newPostKeypair])
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
                <form onSubmit={createPost} className={styles.form}>
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
                    <button type="submit" className={styles.formButton}>Create Post</button>
                </form>
            ) : (
                <span>Connect Your Wallet</span>
            )}
        </div>
    );
};
