'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Game, Category } from '@/types';
import { gamesApi, categoriesApi } from '@/lib/api';
import GameCard from '@/components/game/GameCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Star, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [topRatedGames, setTopRatedGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allGames, categoriesData] = await Promise.all([
          gamesApi.getAll(),
          categoriesApi.getAll(),
        ]);

        // Filter featured games
        const featured = allGames.filter(game => game.featured);
        setFeaturedGames(featured.slice(0, 8));

        // Get top-rated games
        const topRated = allGames
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 4);
        setTopRatedGames(topRated);

        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Ultimate Gaming Destination
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Discover amazing games, get the best deals, and join millions of gamers worldwide.
            </p>
            <Link href="/games">
              <Button size="lg" variant="secondary">
                Browse Games
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        {/* Featured Games */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center">
              <Star className="mr-2 h-6 w-6 text-yellow-500" />
              Featured Games
            </h2>
            <Link href="/games?featured=true">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.slice(0, 8).map((category) => (
              <Link key={category.id} href={`/games/category/${category.slug}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold">{category.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Top Rated Games */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center">
              <TrendingUp className="mr-2 h-6 w-6 text-green-500" />
              Top Rated Games
            </h2>
            <Link href="/games?sortBy=rating&order=desc">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topRatedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-16 bg-gray-50 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Gaming?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied gamers who trust GameStore for their gaming needs. 
            Sign up today and get exclusive access to deals and new releases.
          </p>
          <div className="space-x-4">
            <Link href="/register">
              <Button size="lg">
                Sign Up Now
              </Button>
            </Link>
            <Link href="/games">
              <Button size="lg" variant="outline">
                Browse Games
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
