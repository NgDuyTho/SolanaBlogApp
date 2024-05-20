import { FC, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { getProgram } from '../utils/anchorProvider';
import styles from '../styles/Home.module.css';

export const UserProfile: FC = () => {
    const { publicKey, wallet } = useWallet();
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');

    const updateUserProfile = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!publicKey || !wallet) {
            alert('Please connect your wallet!');
            return;
        }

        const program = getProgram(wallet);

        try {
            const tx = await program.methods.updateUser(name, avatar)
                .accounts({
                    userAccount: publicKey,
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
                <form onSubmit={updateUserProfile} className={styles.form}>
                    <label htmlFor="name">Name:</label>
                    <input
                        id="name"
                        type="text"
                        className={styles.formField}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="avatar">Avatar URL:</label>
                    <input
                        id="avatar"
                        type="text"
                        className={styles.formField}
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                        required
                    />
                    <button type="submit" className={styles.formButton}>Update Profile</button>
                </form>
            ) : (
                <span>Connect Your Wallet</span>
            )}
        </div>
    );
};
