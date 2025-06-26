'use client';

import { useState } from 'react';
import { GameSearchParams } from '@/types';
import GameList from '@/components/game/GameList';
import Sidebar from '@/components/layout/Sidebar';

export default function GamesPage() {
  const [searchParams, setSearchParams] = useState<GameSearchParams>({
    q: '',
    sortBy: 'name',
    order: 'asc',
    page: 1,
    limit: 12,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">All Games</h1>
        <p className="text-gray-600">
          Discover your next favorite game from our extensive collection
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Sidebar
              searchParams={searchParams}
              onSearchParamsChange={setSearchParams}
            />
          </div>
        </div>

        {/* Games List */}
        <div className="lg:col-span-3">
          <GameList searchParams={searchParams} />
        </div>
      </div>
    </div>
  );
}
