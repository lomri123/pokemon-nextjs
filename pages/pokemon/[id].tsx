import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import { useRouter } from 'next/router';
import Image from 'next/image';

export interface Stat {
  name: string;
  value: number;
}

export interface Pokemon {
  name: string;
  type: string[];
  stats: Stat[];
  image: string;
}

export default function PokemonDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const resp = await fetch(
          `https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`
        );
        const parsedResp = await resp.json();
        setPokemon(parsedResp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPokemon();
  }, [id]);
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
