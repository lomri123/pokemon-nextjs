import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import Image from 'next/image';
import Box from '@mui/material/Box';

export interface PokemonItem {
  id: number;
  name: string;
  image: string;
}

export type PokemonList = PokemonItem[];

export default function Pokemon() {
  const [pokemon, setPokemon] = useState<PokemonList>([]);
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const resp = await fetch(
          'https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json'
        );
        const parsedResp = await resp.json();
        setPokemon(parsedResp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPokemon();
  }, []);

  return (
    <Box>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h2>Pokemon List</h2>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {pokemon.map((pokemon) => (
          <Link href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
            <div className={styles.card}>
              <Image
                src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`}
                width={200}
                height={200}
                alt={pokemon.name}
              />
              <h3>{pokemon.name}</h3>
            </div>
          </Link>
        ))}
      </Box>
    </Box>
  );
}
