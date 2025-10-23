import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Trophy, Film, Tv, Music, Sparkles, Calendar, Star, ChevronRight } from 'lucide-react';
import { categories } from '../data/mockData';

const iconMap: { [key: string]: any } = {
  trophy: Trophy,
  film: Film,
  tv: Tv,
  music: Music,
  sparkles: Sparkles,
  calendar: Calendar,
  star: Star,
};

export default function AllCategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Link to="/" className="hover:text-indigo-600">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900">Categories</span>
        </div>
        <h1 className="text-4xl">Browse All Categories</h1>
        <p className="text-lg text-slate-600">Discover events across all categories and subcategories</p>
      </div>

      <div className="space-y-8">
        {categories.map((category) => {
          const Icon = iconMap[category.icon] || Star;
          return (
            <Card key={category.id}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <Link to={`/category/${category.id}`}>
                      <h2 className="text-2xl hover:text-indigo-600 transition-colors">{category.name}</h2>
                    </Link>
                    <p className="text-slate-600">{category.subcategories.length} subcategories</p>
                  </div>
                  <Link to={`/category/${category.id}`}>
                    <ChevronRight className="w-6 h-6 text-slate-400 hover:text-indigo-600 transition-colors" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      to={`/events?category=${category.id}&subcategory=${subcategory.id}`}
                      className="px-4 py-2 rounded-lg border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50 text-center transition-colors"
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
