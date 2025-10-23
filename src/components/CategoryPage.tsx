import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ChevronRight } from 'lucide-react';
import { categories } from '../data/mockData';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p>Category not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Link to="/" className="hover:text-indigo-600">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/categories" className="hover:text-indigo-600">
            Categories
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900">{category.name}</span>
        </div>
        <h1 className="text-4xl">{category.name}</h1>
        <p className="text-lg text-slate-600">
          Explore all {category.name.toLowerCase()} events and subcategories
        </p>
      </div>

      {/* Subcategories Grid */}
      <div>
        <h2 className="text-2xl mb-6">Subcategories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.subcategories.map((subcategory) => (
            <Link key={subcategory.id} to={`/events?category=${categoryId}&subcategory=${subcategory.id}`}>
              <Card className="group hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <h3 className="text-xl group-hover:text-indigo-600 transition-colors">
                        {subcategory.name}
                      </h3>
                      <p className="text-sm text-slate-600">Browse all {subcategory.name.toLowerCase()} events</p>
                    </div>
                    <ChevronRight className="w-6 h-6 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* All Categories Link */}
      <div className="pt-8 border-t">
        <Link to="/categories" className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2">
          <ChevronRight className="w-4 h-4 rotate-180" />
          Back to all categories
        </Link>
      </div>
    </div>
  );
}
