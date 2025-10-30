import { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Plus, Edit, Trash2, ChevronRight, ChevronDown } from 'lucide-react';
import { categories } from '../../data/mockData';
import { toast } from 'sonner';


export default function ManageCategories() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'category' | 'subcategory'>('category');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    icon: 'star',
  });

  const iconOptions = ['trophy', 'film', 'tv', 'music', 'sparkles', 'calendar', 'star'];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId]
    );
  };

  const handleOpenModal = (type: 'category' | 'subcategory', item?: any, categoryId?: string) => {
    setModalType(type);
    setEditingItem(item);
    if (categoryId) setSelectedCategoryId(categoryId);
    
    if (item) {
      setFormData({
        name: item.name,
        icon: item.icon || 'star',
      });
    } else {
      setFormData({
        name: '',
        icon: 'star',
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const action = editingItem ? 'updated' : 'created';
    const itemType = modalType === 'category' ? 'Category' : 'Subcategory';
    toast.success(`${itemType} ${action} successfully`);
    setIsModalOpen(false);
  };

  const handleDelete = (type: string, name: string) => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      toast.success(`${type} deleted successfully`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Manage Categories</h1>
          <p className="text-slate-600">Organize events with categories and subcategories</p>
        </div>
        <Button onClick={() => handleOpenModal('category')} className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Categories Tree */}
      <div className="space-y-4">
        {categories.map((category) => {
          const isExpanded = expandedCategories.includes(category.id);
          return (
            <Card key={category.id}>
              <CardContent className="p-0">
                {/* Category Header */}
                <div className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="flex items-center gap-3 flex-1 text-left"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600">{category.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg">{category.name}</h3>
                      <p className="text-sm text-slate-600">
                        {category.subcategories.length} subcategories
                      </p>
                    </div>
                  </button>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenModal('subcategory', undefined, category.id)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Subcategory
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenModal('category', category)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete('category', category.name)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Subcategories */}
                {isExpanded && (
                  <div className="border-t border-slate-200 bg-slate-50/50 p-4">
                    <div className="space-y-2">
                      {category.subcategories.map((subcategory) => (
                        <div
                          key={subcategory.id}
                          className="flex items-center justify-between p-3 bg-white rounded-lg"
                        >
                          <span>{subcategory.name}</span>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOpenModal('subcategory', subcategory, category.id)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete('subcategory', subcategory.name)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingItem
                ? `Edit ${modalType === 'category' ? 'Category' : 'Subcategory'}`
                : `Add New ${modalType === 'category' ? 'Category' : 'Subcategory'}`}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={`Enter ${modalType} name`}
              />
            </div>

            {modalType === 'category' && (
              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Select
                  value={formData.icon}
                  onValueChange={(value: string) =>
                    setFormData({ ...formData, icon: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {iconOptions.map((icon) => (
                      <SelectItem key={icon} value={icon}>
                        {icon}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {modalType === 'subcategory' && !editingItem && (
              <div className="space-y-2">
                <Label htmlFor="parentCategory">Parent Category</Label>
                <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
              {editingItem ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
