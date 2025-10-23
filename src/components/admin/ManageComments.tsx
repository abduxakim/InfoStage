import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Search, Check, X, Flag, Eye } from 'lucide-react';
import { mockComments, mockEvents } from '../../data/mockData';
import { toast } from 'sonner@2.0.3';

export default function ManageComments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved'>('all');

  const allComments = mockComments.map((comment) => ({
    ...comment,
    eventTitle: mockEvents.find((e) => e.eventId === comment.eventId)?.title || 'Unknown Event',
  }));

  const filteredComments = allComments.filter((comment) => {
    const matchesSearch =
      comment.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comment.eventTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'approved' && comment.isApproved) ||
      (filterStatus === 'pending' && !comment.isApproved);

    return matchesSearch && matchesStatus;
  });

  const handleApprove = (commentId: string) => {
    toast.success('Comment approved');
  };

  const handleReject = (commentId: string) => {
    toast.success('Comment rejected');
  };

  const handleFlag = (commentId: string) => {
    toast.success('Comment flagged for review');
  };

  const handleDelete = (commentId: string) => {
    if (confirm('Are you sure you want to delete this comment?')) {
      toast.success('Comment deleted');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Comment Moderation</h1>
        <p className="text-slate-600">Review and moderate user comments</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search comments by user, content, or event..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
                className={filterStatus === 'all' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('pending')}
                className={filterStatus === 'pending' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === 'approved' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('approved')}
                className={filterStatus === 'approved' ? 'bg-indigo-600 hover:bg-indigo-700' : ''}
              >
                Approved
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comments Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Comment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Likes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xs">
                            {comment.userName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span>{comment.userName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate">{comment.eventTitle}</TableCell>
                    <TableCell className="max-w-[300px]">
                      <p className="line-clamp-2">{comment.content}</p>
                    </TableCell>
                    <TableCell>
                      {new Date(comment.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </TableCell>
                    <TableCell>
                      {comment.isApproved ? (
                        <Badge className="bg-emerald-500">Approved</Badge>
                      ) : (
                        <Badge variant="secondary">Pending</Badge>
                      )}
                    </TableCell>
                    <TableCell>{comment.likes}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {!comment.isApproved && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleApprove(comment.id)}
                            title="Approve"
                            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleFlag(comment.id)}
                          title="Flag"
                          className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                        >
                          <Flag className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(comment.id)}
                          title="Delete"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-600 mb-1">Total Comments</p>
            <p className="text-3xl">{allComments.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-600 mb-1">Pending Review</p>
            <p className="text-3xl">{allComments.filter((c) => !c.isApproved).length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-600 mb-1">Approved</p>
            <p className="text-3xl">{allComments.filter((c) => c.isApproved).length}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
