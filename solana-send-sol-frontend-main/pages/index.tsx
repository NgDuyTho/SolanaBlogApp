import { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import WalletContextProvider from '../components/WalletContextProvider'
import { AppBar } from '../components/AppBar'
import { BalanceDisplay } from '../components/BalanceDisplay'
import { SendSolForm } from '../components/SendSolForm' 
import Head from 'next/head'
import { CreatePostForm } from '../components/CreatePostForm';
import { UpdatePostForm } from '../components/UpdatePostForm';
import { DeletePostForm } from '../components/DeletePostForm';
import { PostList } from '../components/PostList';
import { UserProfile } from '../components/UserProfile';

const Home: NextPage = (props) => {

  return (
    <div className={styles.App}>
      <Head>
        <title>Wallet-Adapter Example</title>
        <meta
          name="description"
          content="Wallet-Adapter Example"
        />
      </Head>
      <WalletContextProvider>
        <AppBar />
        <div className={styles.AppBody}>
          <BalanceDisplay />
          <CreatePostForm />
          <UpdatePostForm />
          <DeletePostForm />
          <PostList />
          <UserProfile />
        </div>
      </WalletContextProvider >
    </div>
  );
}

export default Home;