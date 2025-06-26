'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Game } from '@/types';
import { gamesApi } from '@/lib/api';
import GameDetails from '@/components/game/GameDetails';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function GameDetailPage() {
  const params = useParams();
  const gameId = parseInt(params.id as string);
  
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGame = async () => {
      if (!gameId || isNaN(gameId)) {
        setError('Invalid game ID');
        setLoading(false);
        return;
      }

      try {
        const gameData = await gamesApi.getById(gameId);
        setGame(gameData);
      } catch (error: any) {
        console.error('Error fetching game:', error);
        setError(error.message || 'Failed to load game details');
      } finally {
        setLoading(false);
      }
    };

    fetchGame();
  }, [gameId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <span>Loading game details...</span>
        </div>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error || 'The game you\'re looking for doesn\'t exist.'}
          </p>
          <Link href="/games">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Games
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <Link href="/games" className="text-primary hover:underline flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Games
        </Link>
      </nav>

      {/* Game Details */}
      <GameDetails game={game} />
    </div>
  );
}
