import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { mockEvents, categories } from '../../data/mockData';
import { toast } from 'sonner';


export default function ManageEvents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    shortDescription: '',
    category: '',
    subcategory: '',
    date: '',
    time: '',
    location: '',
    organizer: '',
    ticketUrl: '',
    ticketSite: 'Afisha',
    isTrending: false,
  });

  const filteredEvents = mockEvents.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenModal = (event?: any) => {
    if (event) {
      setEditingEvent(event);
      setFormData({
        title: event.title,
        description: event.description,
        shortDescription: event.shortDescription,
        category: event.category,
        subcategory: event.subcategory,
        date: event.date,
        time: event.time,
        location: event.location,
        organizer: event.organizer,
        ticketUrl: event.ticketUrl,
        ticketSite: event.ticketSite,
        isTrending: event.isTrending,
      });
    } else {
      setEditingEvent(null);
      setFormData({
        title: '',
        description: '',
        shortDescription: '',
        category: '',
        subcategory: '',
        date: '',
        time: '',
        location: '',
        organizer: '',
        ticketUrl: '',
        ticketSite: 'Afisha',
        isTrending: false,
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    toast.success(editingEvent ? 'Event updated successfully' : 'Event created successfully');
    setIsModalOpen(false);
  };

  const handleDelete = (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      toast.success('Event deleted successfully');
    }
  };

  const selectedCategory = categories.find((c) => c.name === formData.category);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Manage Events</h1>
          <p className="text-slate-600">Create, edit, and manage all events on the platform</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Event
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search events by title, location, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Events Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>
                      <div>
                        <p>{event.title}</p>
                        <p className="text-sm text-slate-500">{event.organizer}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{event.category}</Badge>
                    </TableCell>
                    <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{event.location}</TableCell>
                    <TableCell>
                      {event.isTrending && <Badge className="bg-emerald-500">Trending</Badge>}
                      {event.isPopular && <Badge variant="secondary">Popular</Badge>}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-slate-400" />
                        <span>{event.views.toLocaleString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenModal(event)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(event.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter event title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description</Label>
              <Input
                id="shortDescription"
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="Brief description for cards"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter full event description"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  onValueChange={(value: string) =>
                  setFormData({ ...formData, category: value, subcategory: '' })
}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subcategory">Subcategory</Label>
                <Select
                 onValueChange={(value: string) =>
                  setFormData({ ...formData, subcategory: value })}
                  disabled={!selectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCategory?.subcategories.map((subcat) => (
                      <SelectItem key={subcat.id} value={subcat.name}>
                        {subcat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter event location"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organizer">Organizer</Label>
              <Input
                id="organizer"
                value={formData.organizer}
                onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                placeholder="Enter organizer name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ticketUrl">Ticket URL</Label>
                <Input
                  id="ticketUrl"
                  value={formData.ticketUrl}
                  onChange={(e) => setFormData({ ...formData, ticketUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ticketSite">Ticket Site</Label>
                <Select
                 onValueChange={(value: string) =>
                  setFormData({ ...formData, ticketSite: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Afisha">Afisha</SelectItem>
                    <SelectItem value="iTicket">iTicket</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isTrending"
                checked={formData.isTrending}
                onChange={(e) => setFormData({ ...formData, isTrending: e.target.checked })}
                className="w-4 h-4"
              />
              <Label htmlFor="isTrending" className="cursor-pointer">
                Mark as Trending
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
              {editingEvent ? 'Update Event' : 'Create Event'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
