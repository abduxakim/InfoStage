import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, Users, MessageSquare, TrendingUp, Eye, Heart } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { mockStats, weeklyVisits, categoryPopularity, mockEvents } from '../../data/mockData';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];

export default function AdminDashboard() {
  const recentEvents = mockEvents.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl mb-2">Dashboard Overview</h1>
        <p className="text-slate-600">Welcome back! Here's what's happening with your platform.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Events</p>
                <p className="text-3xl">{mockStats.totalEvents}</p>
                <p className="text-xs text-emerald-600 mt-2">+12% from last month</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Active Users</p>
                <p className="text-3xl">{mockStats.activeUsers.toLocaleString()}</p>
                <p className="text-xs text-emerald-600 mt-2">+8% from last month</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Comments</p>
                <p className="text-3xl">{mockStats.totalComments.toLocaleString()}</p>
                <p className="text-xs text-emerald-600 mt-2">+23% from last month</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Trending Events</p>
                <p className="text-3xl">{mockStats.trendingEvents}</p>
                <p className="text-xs text-emerald-600 mt-2">Active this week</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Visits */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl mb-4">Weekly Visits</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyVisits}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line type="monotone" dataKey="visits" stroke="#4F46E5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Popularity */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl mb-4">Category Popularity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryPopularity}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryPopularity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Events */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl mb-4">Recent Events</h3>
          <div className="space-y-4">
            {recentEvents.map((event) => (
              <div key={event.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="w-16 h-16 rounded-lg bg-slate-200 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="truncate">{event.title}</h4>
                    {event.isTrending && <Badge className="bg-emerald-500">Trending</Badge>}
                  </div>
                  <p className="text-sm text-slate-600 truncate">{event.location}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{event.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>{event.likes.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
