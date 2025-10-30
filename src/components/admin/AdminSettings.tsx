import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { toast } from 'sonner';


export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'InfoStage',
    siteDescription: 'Your premier destination for discovering and exploring events worldwide',
    contactEmail: 'contact@infostage.com',
    afishaUrl: 'https://afisha.example.com',
    iTicketUrl: 'https://iticket.example.com',
    enableComments: true,
    requireCommentApproval: true,
    enableFavorites: true,
    maintenanceMode: false,
  });

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">Settings</h1>
        <p className="text-slate-600">Manage platform settings and configurations</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="ticketing">Ticketing</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 mt-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-xl mb-4">General Settings</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={settings.siteName}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea
                      id="siteDescription"
                      value={settings.siteDescription}
                      onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="mb-1">Maintenance Mode</p>
                  <p className="text-sm text-slate-600">Temporarily disable public access to the site</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked: boolean) =>
                    setSettings({ ...settings, maintenanceMode: checked })}
                />
              </div>

              <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ticketing" className="space-y-6 mt-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-xl mb-4">External Ticketing Links</h3>
                <p className="text-sm text-slate-600 mb-6">
                  Configure the URLs for external ticketing platforms
                </p>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="afishaUrl">Afisha URL</Label>
                    <Input
                      id="afishaUrl"
                      value={settings.afishaUrl}
                      onChange={(e) => setSettings({ ...settings, afishaUrl: e.target.value })}
                      placeholder="https://afisha.example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="iTicketUrl">iTicket URL</Label>
                    <Input
                      id="iTicketUrl"
                      value={settings.iTicketUrl}
                      onChange={(e) => setSettings({ ...settings, iTicketUrl: e.target.value })}
                      placeholder="https://iticket.example.com"
                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
                Save Ticketing Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-6 mt-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-xl mb-4">Feature Toggles</h3>
                <p className="text-sm text-slate-600 mb-6">
                  Enable or disable platform features
                </p>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="mb-1">Enable Comments</p>
                      <p className="text-sm text-slate-600">
                        Allow users to comment on events
                      </p>
                    </div>
                    <Switch
                    onCheckedChange={(checked: boolean) =>
                      setSettings({ ...settings, enableComments: checked })}

                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="mb-1">Require Comment Approval</p>
                      <p className="text-sm text-slate-600">
                        Comments must be approved before appearing publicly
                      </p>
                    </div>
                    <Switch
                     onCheckedChange={(checked: boolean) =>
                      setSettings({ ...settings, enableComments: checked })}

                      disabled={!settings.enableComments}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="mb-1">Enable Favorites</p>
                      <p className="text-sm text-slate-600">
                        Allow users to save events to their favorites
                      </p>
                    </div>
                    <Switch
                     onCheckedChange={(checked: boolean) =>
                        setSettings({ ...settings, enableComments: checked })}

                    />
                  </div>
                </div>
              </div>

              <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
                Save Feature Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admin" className="space-y-6 mt-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-xl mb-4">Admin Account</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="adminName">Name</Label>
                    <Input id="adminName" defaultValue="Admin User" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adminEmail">Email</Label>
                    <Input id="adminEmail" type="email" defaultValue="admin@infostage.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>
                </div>
              </div>

              <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
                Update Admin Account
              </Button>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-6">
              <h3 className="text-xl text-red-900 mb-2">Danger Zone</h3>
              <p className="text-sm text-red-700 mb-4">
                Irreversible and destructive actions
              </p>
              <Button variant="destructive">Clear All Data</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
