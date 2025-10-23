import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Trophy, Film, Tv, Music, Sparkles, Calendar, Star, MapPin, Clock, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { mockEvents, categories } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

const iconMap: { [key: string]: any } = {
  trophy: Trophy,
  film: Film,
  tv: Tv,
  music: Music,
  sparkles: Sparkles,
  calendar: Calendar,
  star: Star,
};

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const trendingEvents = mockEvents.filter((e) => e.isTrending);
  const popularEvents = mockEvents.filter((e) => e.isPopular);

  const nextSlide = () => {
    setHeroIndex((prev) => (prev + 1) % trendingEvents.length);
  };

  const prevSlide = () => {
    setHeroIndex((prev) => (prev - 1 + trendingEvents.length) % trendingEvents.length);
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section with Slideshow */}
      <section className="relative h-[600px] bg-slate-900 overflow-hidden">
        {trendingEvents.map((event, index) => (
          <div
            key={event.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === heroIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0">
              <ImageWithFallback
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </div>
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-2xl space-y-6">
                <Badge className="bg-emerald-500 hover:bg-emerald-600">Trending Now</Badge>
                <h1 className="text-5xl lg:text-6xl text-white">{event.title}</h1>
                <p className="text-xl text-slate-200">{event.shortDescription}</p>
                <div className="flex flex-wrap gap-4 text-slate-200">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Link to={`/events/${event.id}`}>
                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                      View Details
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    <Heart className="w-5 h-5 mr-2" />
                    Add to Favorites
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {trendingEvents.map((_, index) => (
            <button
              key={index}
              onClick={() => setHeroIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === heroIndex ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <Card className="shadow-xl">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Input
                type="text"
                placeholder="Search for events, categories, or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Link to={`/search?q=${searchQuery}`}>
                <Button className="bg-indigo-600 hover:bg-indigo-700">Search</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl mb-8">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Star;
            return (
              <Link key={category.id} to={`/category/${category.id}`}>
                <Card className="group hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer bg-gradient-to-br from-white to-slate-50">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-sm text-slate-700 group-hover:text-indigo-600 transition-colors">
                      {category.name}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Popular This Week */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl">Popular This Week</h2>
          <Link to="/events">
            <Button variant="ghost" className="text-indigo-600">
              View All
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto pb-4 -mx-4 px-4">
          <div className="flex gap-6 min-w-max">
            {popularEvents.map((event) => (
              <Link key={event.id} to={`/events/${event.id}`}>
                <Card className="w-80 group hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-indigo-600">{event.category}</Badge>
                    </div>
                  </div>
                  <CardContent className="p-5 space-y-3">
                    <h3 className="text-lg line-clamp-1 group-hover:text-indigo-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{event.shortDescription}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate max-w-[120px]">{event.location.split(',')[0]}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-br from-indigo-600 to-indigo-500 text-white overflow-hidden">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-4xl">Never Miss an Event</h2>
            <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
              Sign up to get personalized event recommendations and be the first to know about new events in your area.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-slate-50">
                Create Account
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
