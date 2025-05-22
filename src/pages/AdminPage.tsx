import React, { useState, useEffect } from 'react';
import { ShoppingBag, Users, BarChart3, Settings, Plus, Trash, Edit, Eye, CheckCircle, LogOut, X } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { Product } from '../types';
import { productService } from '../services/productService';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'addProduct' | 'dashboard' | 'customers'>('products');
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    brand: '',
    category: 'sneakers',
    price: 0,
    originalPrice: 0,
    condition: 'good',
    size: '',
    images: ['https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg'],
    description: '',
    authenticated: true,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  const [customers, setCustomers] = useState<{ name: string; email: string }[]>([]);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const products = await productService.getAllProducts();
      setProductList(products);
    } catch (err) {
      console.error('Error loading products:', err);
      setError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const loadCustomers = async () => {
    // TODO: Replace with real orderService.getAllOrders()
    // Mock data for demonstration
    setCustomers([
      { name: 'John Doe', email: 'john@example.com' },
      { name: 'Jane Smith', email: 'jane@example.com' },
    ]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'number') {
      setNewProduct({
        ...newProduct,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value,
      });
    }
  };

  const handleImageInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const imageUrls = e.target.value.split(',').map(url => url.trim()).filter(url => url !== '');
    setNewProduct(prev => ({
      ...prev,
      images: imageUrls
    }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditImageInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const imageUrls = e.target.value.split(',').map(url => url.trim()).filter(url => url !== '');
    setEditForm(prev => ({
      ...prev,
      images: imageUrls
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Ensure images array is not empty
    if (!newProduct.images || newProduct.images.length === 0) {
      setError('At least one image URL is required.');
      setLoading(false);
      return;
    }

    try {
      await productService.addProduct(newProduct as Omit<Product, 'id'>);
      setNewProduct({
        name: '',
        brand: '',
        category: 'sneakers',
        price: 0,
        originalPrice: 0,
        condition: 'good',
        size: '',
        images: [''], // Reset to a single empty string for the textarea
        description: '',
        authenticated: true,
      });
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setActiveTab('products');
      await loadProducts();
    } catch (err) {
      console.error('Error adding product:', err);
      setError(err instanceof Error ? err.message : 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setError(null);
      setLoading(true);
      await productService.deleteProduct(id);
      await loadProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-dark text-light min-h-screen">
      <Header />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <h1 className="font-display text-2xl md:text-3xl text-light mb-8">Admin Panel</h1>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-24 right-4 bg-green-500 text-dark px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-fade-in">
            <CheckCircle size={20} />
            <span>Product added successfully!</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="fixed top-24 right-4 bg-red-500 text-light px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-fade-in">
            <span>{error}</span>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 bg-secondary rounded-lg p-4">
            <h2 className="font-display text-xl text-primary mb-4">Management</h2>

            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`w-full text-left px-4 py-2 rounded flex items-center ${activeTab === 'dashboard' ? 'bg-primary text-dark' : 'text-light hover:bg-dark'
                    }`}
                >
                  <BarChart3 size={18} className="mr-2" />
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full text-left px-4 py-2 rounded flex items-center ${activeTab === 'products' ? 'bg-primary text-dark' : 'text-light hover:bg-dark'
                    }`}
                >
                  <ShoppingBag size={18} className="mr-2" />
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('addProduct')}
                  className={`w-full text-left px-4 py-2 rounded flex items-center ${activeTab === 'addProduct' ? 'bg-primary text-dark' : 'text-light hover:bg-dark'
                    }`}
                >
                  <Plus size={18} className="mr-2" />
                  Add Product
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('customers');
                    loadCustomers();
                  }}
                  className={`w-full text-left px-4 py-2 rounded flex items-center ${activeTab === 'customers' ? 'bg-primary text-dark' : 'text-light hover:bg-dark'}`}
                >
                  <Users size={18} className="mr-2" />
                  Customers
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 rounded flex items-center text-light hover:bg-dark"
                >
                  <Settings size={18} className="mr-2" />
                  Settings
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 rounded flex items-center text-primary hover:bg-primary/10 mt-4 transition-colors"
                >
                  <LogOut size={18} className="mr-2" />
                  Logout
                </button>
              </li>
            </ul>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {activeTab === 'dashboard' && (
              <div className="bg-secondary rounded-lg p-6">
                <h2 className="font-display text-xl text-light mb-6">Dashboard</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-dark p-4 rounded-lg border border-primary/30">
                    <div className="text-gray-400 mb-1">Total Products</div>
                    <div className="text-primary text-2xl font-bold">{productList.length}</div>
                  </div>

                  <div className="bg-dark p-4 rounded-lg border border-primary/30">
                    <div className="text-gray-400 mb-1">Total Orders</div>
                    <div className="text-primary text-2xl font-bold">24</div>
                  </div>

                  <div className="bg-dark p-4 rounded-lg border border-primary/30">
                    <div className="text-gray-400 mb-1">Total Revenue</div>
                    <div className="text-primary text-2xl font-bold">$12,458</div>
                  </div>
                </div>

                <h3 className="font-display text-lg text-light mb-4">Recent Activity</h3>

                <div className="bg-dark rounded-lg p-4 border border-primary/30">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-gray-800">
                      <div>
                        <div className="text-light">New order #1082</div>
                        <div className="text-gray-400 text-sm">Rolex Submariner</div>
                      </div>
                      <div className="text-gray-400 text-sm">2 hours ago</div>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-gray-800">
                      <div>
                        <div className="text-light">New product added</div>
                        <div className="text-gray-400 text-sm">Yeezy Boost 350</div>
                      </div>
                      <div className="text-gray-400 text-sm">5 hours ago</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-light">Product sold out</div>
                        <div className="text-gray-400 text-sm">Air Jordan 1 Chicago</div>
                      </div>
                      <div className="text-gray-400 text-sm">Yesterday</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="bg-secondary rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-display text-xl text-light">Products</h2>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<Plus size={16} />}
                    onClick={() => setActiveTab('addProduct')}
                  >
                    Add Product
                  </Button>
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="text-gray-400 mt-4">Loading products...</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="border-b border-gray-800">
                        <tr>
                          <th className="pb-2 font-medium text-gray-400">Product</th>
                          <th className="pb-2 font-medium text-gray-400">Category</th>
                          <th className="pb-2 font-medium text-gray-400">Price</th>
                          <th className="pb-2 font-medium text-gray-400">Condition</th>
                          <th className="pb-2 font-medium text-gray-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productList.map((product) => (
                          <tr key={product.id} className="border-b border-gray-800">
                            <td className="py-3">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded overflow-hidden mr-3">
                                  <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="text-light">{product.name}</div>
                                  <div className="text-gray-400 text-sm">{product.brand}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.category === 'sneakers'
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'bg-purple-500/20 text-purple-400'
                                }`}>
                                {product.category}
                              </span>
                            </td>
                            <td className="py-3 text-primary font-medium">${product.price.toFixed(2)}</td>
                            <td className="py-3 text-gray-300">{product.condition}</td>
                            <td className="py-3">
                              <div className="flex space-x-2">
                                <button className="p-1 text-gray-400 hover:text-primary" title="View">
                                  <Eye size={16} />
                                </button>
                                <button
                                  className="p-1 text-gray-400 hover:text-primary"
                                  title="Edit"
                                  onClick={() => {
                                    setEditingProduct(product);
                                    setEditForm({ ...product, images: product.images.join(', ') });
                                  }}
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  className="p-1 text-gray-400 hover:text-red-500"
                                  title="Delete"
                                  onClick={() => deleteProduct(product.id)}
                                >
                                  <Trash size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addProduct' && (
              <div className="bg-secondary rounded-lg p-6">
                <h2 className="font-display text-xl text-light mb-6">Add New Product</h2>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-gray-300 mb-1">Product Name</label>
                      <input
                        type="text"
                        name="name"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-light focus:border-primary focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1">Brand</label>
                      <input
                        type="text"
                        name="brand"
                        value={newProduct.brand}
                        onChange={handleInputChange}
                        className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-light focus:border-primary focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1">Category</label>
                      <select
                        name="category"
                        value={newProduct.category}
                        onChange={handleInputChange}
                        className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-light focus:border-primary focus:outline-none"
                        required
                      >
                        <option value="sneakers">Sneakers</option>
                        <option value="watches">Watches</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1">Size</label>
                      <input
                        type="text"
                        name="size"
                        value={newProduct.size}
                        onChange={handleInputChange}
                        className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-light focus:border-primary focus:outline-none"
                        placeholder="US 10 / 42mm"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1">Price ($)</label>
                      <input
                        type="number"
                        name="price"
                        value={newProduct.price || ''}
                        onChange={handleInputChange}
                        className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-light focus:border-primary focus:outline-none"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1">Original Price ($)</label>
                      <input
                        type="number"
                        name="originalPrice"
                        value={newProduct.originalPrice || ''}
                        onChange={handleInputChange}
                        className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-light focus:border-primary focus:outline-none"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1">Condition</label>
                      <select
                        name="condition"
                        value={newProduct.condition}
                        onChange={handleInputChange}
                        className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-light focus:border-primary focus:outline-none"
                        required
                      >
                        <option value="new">New</option>
                        <option value="like new">Like New</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-300 mb-1">Image URLs (comma-separated)</label>
                      <textarea
                        name="images"
                        value={newProduct.images?.join(', ') || ''}
                        onChange={handleImageInputChange}
                        className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-light focus:border-primary focus:outline-none"
                        rows={3}
                        required
                      ></textarea>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-300 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={newProduct.description}
                      onChange={handleInputChange}
                      className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-light focus:border-primary focus:outline-none h-24"
                      required
                    />
                  </div>

                  <div className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      name="authenticated"
                      checked={newProduct.authenticated}
                      onChange={(e) => setNewProduct({ ...newProduct, authenticated: e.target.checked })}
                      className="mr-2"
                      id="authenticated-checkbox"
                    />
                    <label htmlFor="authenticated-checkbox" className="text-gray-300">Authenticated</label>
                  </div>

                  <Button type="submit" variant="primary" loading={loading}>
                    Add Product
                  </Button>
                </form>
              </div>
            )}

            {activeTab === 'customers' && (
              <div className="bg-secondary rounded-lg p-6">
                <h2 className="font-display text-xl text-light mb-6">Customers</h2>
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="pb-2 font-medium text-gray-400">Name</th>
                      <th className="pb-2 font-medium text-gray-400">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer) => (
                      <tr key={customer.email}>
                        <td className="py-2 text-light">{customer.name}</td>
                        <td className="py-2 text-light">{customer.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-secondary p-6 rounded-lg w-full max-w-lg relative flex flex-col max-h-[90vh]">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-primary"
              onClick={() => setEditingProduct(null)}
            >
              <X size={24} />
            </button>
            <h2 className="font-display text-xl text-primary mb-4">Edit Product</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                // Ensure images array is not empty in edit form
                if (!editForm.images || (Array.isArray(editForm.images) && editForm.images.length === 0) || (typeof editForm.images === 'string' && editForm.images.trim() === '')) {
                  setError('At least one image URL is required.');
                  return;
                }

                // Convert comma-separated string back to array if it's a string
                const imagesToSend = typeof editForm.images === 'string'
                  ? editForm.images.split(',').map(url => url.trim()).filter(url => url !== '')
                  : editForm.images;

                // Ensure imagesToSend is an array and not empty
                if (!Array.isArray(imagesToSend) || imagesToSend.length === 0) {
                  setError('At least one valid image URL is required.');
                  return;
                }

                try {
                  setLoading(true);
                  await productService.updateProduct(editingProduct.id, { ...editForm, images: imagesToSend });
                  setEditingProduct(null);
                  await loadProducts();
                } catch (err) {
                  setError('Failed to update product');
                } finally {
                  setLoading(false);
                }
              }}
              className="flex flex-col flex-1 overflow-y-auto gap-4 pr-2"
              style={{ maxHeight: '65vh' }}
            >
              <div>
                <label className="block text-gray-300 mb-1">Product Name</label>
                <input
                  type="text"
                  value={editForm.name || ''}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-light focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-1">Brand</label>
                <input
                  type="text"
                  value={editForm.brand || ''}
                  onChange={e => setEditForm({ ...editForm, brand: e.target.value })}
                  className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-light focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Category</label>
                <select
                  name="category"
                  value={editForm.category}
                  onChange={handleEditInputChange}
                  className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-light focus:border-primary focus:outline-none"
                  required
                >
                  <option value="sneakers">Sneakers</option>
                  <option value="watches">Watches</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Size</label>
                <input
                  type="text"
                  name="size"
                  value={editForm.size || ''}
                  onChange={handleEditInputChange}
                  className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-light focus:border-primary focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={editForm.price || ''}
                  onChange={handleEditInputChange}
                  className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-light focus:border-primary focus:outline-none"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Original Price ($)</label>
                <input
                  type="number"
                  name="originalPrice"
                  value={editForm.originalPrice || ''}
                  onChange={handleEditInputChange}
                  className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-light focus:border-primary focus:outline-none"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Condition</label>
                <select
                  name="condition"
                  value={editForm.condition}
                  onChange={handleEditInputChange}
                  className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-light focus:border-primary focus:outline-none"
                  required
                >
                  <option value="new">New</option>
                  <option value="like new">Like New</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Image URLs (comma-separated)</label>
                {/* Check if editForm.images is an array before joining */}
                <textarea
                  name="images"
                  value={Array.isArray(editForm.images) ? editForm.images.join(', ') : editForm.images || ''}
                  onChange={handleEditImageInputChange}
                  className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-light focus:border-primary focus:outline-none"
                  rows={3}
                  required
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block text-gray-300 mb-1">Description</label>
                <textarea
                  name="description"
                  value={editForm.description || ''}
                  onChange={handleEditInputChange}
                  className="w-full bg-dark border border-gray-700 rounded px-3 py-2 text-light focus:border-primary focus:outline-none"
                  rows={4}
                  required
                ></textarea>
              </div>

              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  name="authenticated"
                  checked={editForm.authenticated || false}
                  onChange={(e) => setEditForm({ ...editForm, authenticated: e.target.checked })}
                  className="mr-2"
                  id="edit-authenticated-checkbox"
                />
                <label htmlFor="edit-authenticated-checkbox" className="text-gray-300">Authenticated</label>
              </div>

              <Button type="submit" variant="primary" loading={loading}>
                Save Changes
              </Button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdminPage;