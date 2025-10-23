import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import {
  Calendar,
  MapPin,
  Clock,
  User,
  Heart,
  Share2,
  ExternalLink,
  ChevronRight,
  Eye,
  ThumbsUp,
  MessageCircle,
} from 'lucide-react';
import { mockEvents, mockComments } from '../data/mockData';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const event = mockEvents.find((e) => e.id === eventId);
  const eventComments = mockComments.filter((c) => c.eventId === eventId && c.isApproved);
  const [newComment, setNewComment] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p>Event not found</p>
      </div>
    );
  }

  const relatedEvents = mockEvents.filter(
    (e) => e.category === event.category && e.id !== event.id
  ).slice(0, 3);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    toast.success('Comment submitted for approval');
    setNewComment('');
  };

  const handleShare = (platform: string) => {
    toast.success(`Shared to ${platform}`);
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  return (
    <div className="pb-12">
      {/* Hero Header */}
      <div className="relative h-[400px] bg-slate-900">
        <ImageWithFallback
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex items-center gap-2 text-sm text-slate-300 mb-4">
              <Link to="/" className="hover:text-white">
                Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/events" className="hover:text-white">
                Events
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{event.title}</span>
            </div>
            <div className="flex flex-wrap gap-3 mb-4">
              <Badge className="bg-indigo-600">{event.category}</Badge>
              <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                {event.subcategory}
              </Badge>
              {event.isTrending && <Badge className="bg-emerald-500">Trending</Badge>}
            </div>
            <h1 className="text-4xl lg:text-5xl text-white mb-2">{event.title}</h1>
            <div className="flex items-center gap-6 text-slate-300">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{event.views.toLocaleString()} views</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{event.likes.toLocaleString()} likes</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span>{eventComments.length} comments</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Details */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl mb-4">Event Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-indigo-600 mt-1" />
                      <div>
                        <p className="text-sm text-slate-600">Date</p>
                        <p>
                          {new Date(event.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-indigo-600 mt-1" />
                      <div>
                        <p className="text-sm text-slate-600">Time</p>
                        <p>{event.time}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-indigo-600 mt-1" />
                      <div>
                        <p className="text-sm text-slate-600">Location</p>
                        <p>{event.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-indigo-600 mt-1" />
                      <div>
                        <p className="text-sm text-slate-600">Organizer</p>
                        <p>{event.organizer}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-xl mb-3">Description</h3>
                  <p className="text-slate-700 leading-relaxed">{event.description}</p>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h2 className="text-2xl mb-4">Comments ({eventComments.length})</h2>

                  {/* Add Comment */}
                  <div className="space-y-3 mb-6">
                    <Textarea
                      placeholder="Share your thoughts about this event..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      rows={3}
                    />
                    <Button onClick={handleAddComment} className="bg-indigo-600 hover:bg-indigo-700">
                      Post Comment
                    </Button>
                  </div>

                  <Separator className="my-6" />

                  {/* Comments List */}
                  <div className="space-y-6">
                    {eventComments.map((comment) => (
                      <div key={comment.id} className={comment.parentId ? 'ml-12' : ''}>
                        <div className="flex gap-4">
                          <Avatar>
                            <AvatarFallback className="bg-indigo-100 text-indigo-600">
                              {comment.userName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <span>{comment.userName}</span>
                              <span className="text-sm text-slate-500">
                                {new Date(comment.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-slate-700">{comment.content}</p>
                            <div className="flex items-center gap-4 text-sm">
                              <button className="flex items-center gap-1 text-slate-500 hover:text-indigo-600">
                                <ThumbsUp className="w-4 h-4" />
                                <span>{comment.likes}</span>
                              </button>
                              <button className="text-slate-500 hover:text-indigo-600">Reply</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <Card>
              <CardContent className="p-6 space-y-3">
                <Button
                  size="lg"
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => window.open(event.ticketUrl, '_blank')}
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Buy Tickets on {event.ticketSite}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full"
                  onClick={handleToggleFavorite}
                >
                  <Heart className={`w-5 h-5 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                  {isFavorite ? 'Saved' : 'Add to Favorites'}
                </Button>
                <div className="grid grid-cols-4 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('Facebook')}
                    title="Share on Facebook"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('Twitter')}
                    title="Share on Twitter"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('Telegram')}
                    title="Share on Telegram"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('Instagram')}
                    title="Share on Instagram"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Related Events */}
            {relatedEvents.length > 0 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl">Related Events</h3>
                  <div className="space-y-4">
                    {relatedEvents.map((relatedEvent) => (
                      <Link key={relatedEvent.id} to={`/events/${relatedEvent.id}`}>
                        <div className="group flex gap-3 hover:bg-slate-50 p-2 rounded-lg transition-colors">
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <ImageWithFallback
                              src={relatedEvent.imageUrl}
                              alt={relatedEvent.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="line-clamp-2 text-sm group-hover:text-indigo-600 transition-colors">
                              {relatedEvent.title}
                            </h4>
                            <p className="text-xs text-slate-500 mt-1">
                              {new Date(relatedEvent.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
