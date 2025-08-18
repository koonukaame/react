'use client';

import type { CharacterResponse } from '@entities';
import { createContext } from 'react';

export const CharactersContext = createContext<CharacterResponse | null>(null);
