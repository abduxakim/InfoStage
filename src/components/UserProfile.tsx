import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, MapPin, Settings, Heart } from 'lucide-react';
import { mockEvents, mockUser } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function UserProfile() {
  const favoriteEvents = mockEvents.filter((e) => mockUser.favorites.includes(e.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarFallback className="bg-indigo-100 text-indigo-600 text-3xl">
                {mockUser.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl mb-2">{mockUser.name}</h1>
              <p className="text-slate-600 mb-4">{mockUser.email}</p>
              <div className="flex gap-4 text-sm">
                <div>
                  <span className="text-slate-600">Favorites:</span>{' '}
                  <span>{mockUser.favorites.length}</span>
                </div>
                <div>
                  <span className="text-slate-600">Theme:</span>{' '}
                  <span className="capitalize">{mockUser.theme}</span>
                </div>
              </div>
            </div>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="favorites" className="w-full">
        <TabsList>
          <TabsTrigger value="favorites">
            <Heart className="w-4 h-4 mr-2" />
            Favorites ({favoriteEvents.length})
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="favorites" className="mt-6">
          {favoriteEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteEvents.map((event) => (
                <Link key={event.id} to={`/events/${event.id}`}>
                  <Card className="group hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden h-full">
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-indigo-600">{event.category}</Badge>
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
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Heart className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                <h3 className="text-xl mb-2">No favorites yet</h3>
                <p className="text-slate-600 mb-6">Start adding events to your favorites to see them here</p>
                <Link to="/">
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Browse Events</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-xl mb-4">Account Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-slate-600 mb-1 block">Name</label>
                    <input
                      type="text"
                      defaultValue={mockUser.name}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-600 mb-1 block">Email</label>
                    <input
                      type="email"
                      defaultValue={mockUser.email}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-600 mb-1 block">Theme Preference</label>
                    <select
                      defaultValue={mockUser.theme}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
