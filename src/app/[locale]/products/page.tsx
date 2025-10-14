'use client';

import {
  Package,
  DollarSign,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
} from 'lucide-react';
import { DashboardLayout } from '../components/layout';

export default function ProductsPage() {
  const products = [
    {
      id: 1,
      name: 'Premium Widget',
      category: 'Electronics',
      price: 299.99,
      stock: 45,
      sales: 156,
      image: 'https://via.placeholder.com/60',
    },
    {
      id: 2,
      name: 'Designer T-Shirt',
      category: 'Clothing',
      price: 49.99,
      stock: 120,
      sales: 89,
      image: 'https://via.placeholder.com/60',
    },
    {
      id: 3,
      name: 'Smart Watch',
      category: 'Electronics',
      price: 199.99,
      stock: 23,
      sales: 234,
      image: 'https://via.placeholder.com/60',
    },
    {
      id: 4,
      name: 'Coffee Mug',
      category: 'Home & Garden',
      price: 19.99,
      stock: 200,
      sales: 67,
      image: 'https://via.placeholder.com/60',
    },
  ];

  const handleNavChange = (nav: string) => {
    console.log('Navigation changed to:', nav);
  };

  const handleExport = () => {
    console.log('Export products data');
  };

  const handleCreateReport = () => {
    console.log('Create products report');
  };

  return (
    <DashboardLayout
      activeNav="Products"
      title="Product Management"
      subtitle="Manage your product catalog and inventory."
      userName="Admin"
      onNavChange={handleNavChange}
      onExport={handleExport}
      onCreateReport={handleCreateReport}
    >
      {/* Products Content */}
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-neutral-700 rounded-lg p-6">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-primary mr-3" />
              <div>
                <p className="text-neutral-400 text-sm">Total Products</p>
                <p className="text-white text-2xl font-bold">1,847</p>
              </div>
            </div>
          </div>
          <div className="bg-neutral-700 rounded-lg p-6">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <p className="text-neutral-400 text-sm">Total Revenue</p>
                <p className="text-white text-2xl font-bold">$45.2K</p>
              </div>
            </div>
          </div>
          <div className="bg-neutral-700 rounded-lg p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-neutral-400 text-sm">Total Sales</p>
                <p className="text-white text-2xl font-bold">546</p>
              </div>
            </div>
          </div>
          <div className="bg-neutral-700 rounded-lg p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full mr-3 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div>
                <p className="text-neutral-400 text-sm">Low Stock</p>
                <p className="text-white text-2xl font-bold">23</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="bg-neutral-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-lg font-semibold">
              Product Catalog
            </h2>
            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-90 transition-colors">
              Add New Product
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-neutral-600 rounded-lg p-4 hover:bg-neutral-500 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex gap-1">
                    <button className="p-1 text-neutral-400 hover:text-white">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-neutral-400 hover:text-primary">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-neutral-400 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="text-white font-medium mb-1">{product.name}</h3>
                <p className="text-neutral-400 text-sm mb-2">
                  {product.category}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-bold">${product.price}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      product.stock < 50
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {product.stock} in stock
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-neutral-400">
                    Sales: {product.sales}
                  </span>
                  <span className="text-neutral-400">ID: #{product.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
