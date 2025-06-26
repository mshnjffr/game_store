'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Game, Category } from '@/types';
import { gamesApi, categoriesApi } from '@/lib/api';
import GameCard from '@/components/game/GameCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [games, setGames] = useState<Game[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [gamesData, categoryData] = await Promise.all([
          gamesApi.getByCategory(slug),
          categoriesApi.getBySlug(slug),
        ]);
        
        setGames(gamesData);
        setCategory(categoryData);
      } catch (error: any) {
        console.error('Error fetching category data:', error);
        setError(error.message || 'Failed to load category');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <span>Loading category...</span>
        </div>
      </div>
    );
  }

  if (error || !category) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error || 'The category you\'re looking for doesn\'t exist.'}
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

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category.name}</h1>
        <p className="text-gray-600">{category.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          {games.length} game{games.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Games Grid */}
      {games.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">No games found</h3>
          <p className="text-gray-600 mb-6">
            There are currently no games in the {category.name} category.
          </p>
          <Link href="/games">
            <Button>Browse All Games</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
