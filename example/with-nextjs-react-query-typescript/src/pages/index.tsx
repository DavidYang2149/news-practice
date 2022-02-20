import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
import { useQuery } from 'react-query';

import styles from '../../styles/Home.module.css';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const Home: NextPage = () => {
  const [keyword, setKeyword] = useState('');

  const {
    isLoading, data, refetch,
  } = useQuery(['newsList', keyword], async () => {
    const URL = `https://newsapi.org/v2/everything?q=${keyword}&pageSize=9&page=1&apiKey=${API_KEY}`;

    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }, {
    refetchOnWindowFocus: false,
    enabled: false,
  });

  if (isLoading) {
    return (
      <p>Loading...</p>
    );
  }

  const handleOnEnterSearchNews = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') {
      return;
    }
    refetch();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>News Search</title>
        <meta name="description" content="News Search" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to
          {' '}
          <a href="/">News Search!</a>
        </h1>

        <p className={styles.description}>
          Start with
          {' '}
          <code className={styles.code}>Search Bar</code>
        </p>

        <div>
          <input
            type="text"
            placeholder="Search"
            className={styles.search}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={handleOnEnterSearchNews}
          />
        </div>

        <div className={styles.grid}>
          {data && data.articles && data.articles.map((article: {
            publishedAt: string,
            title: string,
            description: string,
            url: string,
          }) => (
            <React.Fragment key={article.publishedAt}>
              <a href={article.url} className={styles.card}>
                <h2>
                  {article.title}
                  {' '}
                  &rarr;
                </h2>
                <p>{article.description}</p>
              </a>
            </React.Fragment>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          {' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
