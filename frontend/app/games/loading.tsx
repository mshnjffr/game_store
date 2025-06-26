import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Loading games...</span>
      </div>
    </div>
  );
}
