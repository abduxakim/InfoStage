import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, MapPin, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { mockEvents, categories } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function EventListingPage() {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get('category');
  const subcategoryId = searchParams.get('subcategory');
  const searchQuery = searchParams.get('q');

  const [sortBy, setSortBy] = useState('date');
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 9;

  // Filter events
  const filteredEvents = useMemo(() => {
    let result = [...mockEvents];

    // Filter by category
    if (categoryId) {
      const category = categories.find((c) => c.id === categoryId);
      if (category) {
        result = result.filter((e) => e.category === category.name);
      }
    }

    // Filter by subcategory
    if (subcategoryId) {
      const category = categories.find((c) => c.id === categoryId);
      const subcategory = category?.subcategories.find((s) => s.id === subcategoryId);
      if (subcategory) {
        result = result.filter((e) => e.subcategory === subcategory.name);
      }
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(query) ||
          e.description.toLowerCase().includes(query) ||
          e.location.toLowerCase().includes(query) ||
          e.category.toLowerCase().includes(query)
      );
    }

    // Sort
    switch (sortBy) {
      case 'date':
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'popularity':
        result.sort((a, b) => b.views - a.views);
        break;
      case 'likes':
        result.sort((a, b) => b.likes - a.likes);
        break;
    }

    return result;
  }, [categoryId, subcategoryId, searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  const getPageTitle = () => {
    if (searchQuery) return `Search Results for "${searchQuery}"`;
    if (categoryId) {
      const category = categories.find((c) => c.id === categoryId);
      if (subcategoryId) {
        const subcategory = category?.subcategories.find((s) => s.id === subcategoryId);
        return `${category?.name} - ${subcategory?.name}`;
      }
      return category?.name || 'Events';
    }
    return 'All Events';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Link to="/" className="hover:text-indigo-600">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900">Events</span>
          </div>
          <h1 className="text-4xl">{getPageTitle()}</h1>
          <p className="text-slate-600">{filteredEvents.length} events found</p>
        </div>

        {/* Filters & Sort */}
        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Sort by Date</SelectItem>
              <SelectItem value="popularity">Sort by Popularity</SelectItem>
              <SelectItem value="likes">Sort by Likes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Events Grid */}
      {paginatedEvents.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedEvents.map((event) => (
              <Link key={event.id} to={`/events/${event.id}`}>
                <Card className="group hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden h-full">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-indigo-600">{event.category}</Badge>
                      {event.isTrending && <Badge className="bg-emerald-500">Trending</Badge>}
                    </div>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <h3 className="text-lg line-clamp-2 group-hover:text-indigo-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{event.shortDescription}</p>
                    <div className="space-y-2 text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? 'default' : 'outline'}
                  onClick={() => setCurrentPage(page)}
                  className={page === currentPage ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-slate-600">No events found matching your criteria.</p>
          <Link to="/">
            <Button className="mt-4 bg-indigo-600 hover:bg-indigo-700">Browse All Events</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
