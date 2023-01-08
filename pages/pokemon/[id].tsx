import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import Image from 'next/image';
import { GetStaticProps } from 'next';

export interface Stat {
  name: string;
  value: number;
}

export interface Pokemon {
  id: string;
  name: string;
  type: string[];
  stats: Stat[];
  image: string;
}

type PageParams = {
  id: string;
};

export async function getStaticPaths() {
  const resp = await fetch(
    'https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json'
  );
  const pokemon: Pokemon[] = await resp.json();

  return {
    paths: pokemon.map((pokemon) => ({
      params: { id: pokemon.id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: PageParams }) {
  const resp = await fetch(
    `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`
  );

  return {
    props: {
      pokemon: await resp.json(),
    },
    // revalidate: 30,
  };
}

export default function PokemonDetails({ pokemon }: { pokemon: Pokemon }) {
  const { name, image, type, stats } = pokemon;
  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <div>
        <Link href='/pokemon'>Back</Link>
      </div>
      <div className={styles.layout}>
        <div>
          <Image
            src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${image}`}
            width={200}
            height={200}
            alt={name}
          />
        </div>
        <div>
          <div className={styles.name}>{name}</div>
          <div className={styles.type}>{type?.join(', ')}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {stats?.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
