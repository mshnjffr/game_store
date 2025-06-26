'use client';

import { useState, useEffect } from 'react';
import { Game, GameSearchParams, GameSearchResponse } from '@/types';
import { gamesApi } from '@/lib/api';
import GameCard from './GameCard';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface GameListProps {
  searchParams: GameSearchParams;
}

export default function GameList({ searchParams }: GameListProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data: GameSearchResponse = await gamesApi.search({
          ...searchParams,
          limit: 12,
        });
        
        setGames(data.games);
        setPagination(data.pagination);
      } catch (error) {
        console.error('Error fetching games:', error);
        setError('Failed to load games. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading games...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No games found</h3>
        <p className="text-gray-600">
          Try adjusting your search filters or browse our featured games.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing {games.length} of {pagination.total} games
          {searchParams.q && (
            <span> for "{searchParams.q}"</span>
          )}
        </p>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2">
          <Button
            variant="outline"
            disabled={pagination.page <= 1}
            onClick={() => {
              // This would be handled by the parent component
              // by updating the searchParams
            }}
          >
            Previous
          </Button>
          
          <span className="px-4 py-2">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          
          <Button
            variant="outline"
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => {
              // This would be handled by the parent component
              // by updating the searchParams
            }}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
