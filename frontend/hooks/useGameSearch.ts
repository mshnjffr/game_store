'use client';

import { useState, useEffect } from 'react';
import { GameSearchParams, GameSearchResponse } from '@/types';
import { gamesApi } from '@/lib/api';

export const useGameSearch = (initialParams: GameSearchParams = {}) => {
  const [searchParams, setSearchParams] = useState<GameSearchParams>({
    q: '',
    sortBy: 'name',
    order: 'asc',
    page: 1,
    limit: 12,
    ...initialParams,
  });
  
  const [data, setData] = useState<GameSearchResponse>({
    games: [],
    pagination: {
      page: 1,
      limit: 12,
      total: 0,
      totalPages: 0,
    },
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchGames = async (params = searchParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await gamesApi.search(params);
      setData(result);
    } catch (error: any) {
      console.error('Search failed:', error);
      setError(error.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      searchGames();
    }, 300); // Debounce search requests

    return () => clearTimeout(debounceTimer);
  }, [searchParams]);

  const updateSearchParams = (newParams: Partial<GameSearchParams>) => {
    setSearchParams(prev => ({
      ...prev,
      ...newParams,
    }));
  };

  return {
    searchParams,
    setSearchParams: updateSearchParams,
    games: data.games,
    pagination: data.pagination,
    loading,
    error,
    searchGames,
  };
};
