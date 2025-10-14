'use client';

import { DashboardLayout } from '../components/layout';
import { Users, Mail, Phone, Calendar } from 'lucide-react';

export default function UsersPage() {
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 890',
      joinDate: '2024-01-15',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 234 567 891',
      joinDate: '2024-01-20',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      phone: '+1 234 567 892',
      joinDate: '2024-02-01',
      status: 'Inactive'
    }
  ];

  const handleNavChange = (nav: string) => {
    console.log('Navigation changed to:', nav);
  };

  const handleExport = () => {
    console.log('Export users data');
  };

  const handleCreateReport = () => {
    console.log('Create users report');
  };

  return (
    <DashboardLayout
      activeNav="Users"
      title="User Management"
      subtitle="Manage your application users and their permissions."
      userName="Admin"
      onNavChange={handleNavChange}
      onExport={handleExport}
      onCreateReport={handleCreateReport}
    >
      {/* Users Content */}
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-700 rounded-lg p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-primary mr-3" />
              <div>
                <p className="text-neutral-400 text-sm">Total Users</p>
                <p className="text-white text-2xl font-bold">1,234</p>
              </div>
            </div>
          </div>
          <div className="bg-neutral-700 rounded-lg p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full mr-3 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div>
                <p className="text-neutral-400 text-sm">Active Users</p>
                <p className="text-white text-2xl font-bold">1,156</p>
              </div>
            </div>
          </div>
          <div className="bg-neutral-700 rounded-lg p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-500 rounded-full mr-3 flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <div>
                <p className="text-neutral-400 text-sm">Inactive Users</p>
                <p className="text-white text-2xl font-bold">78</p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-neutral-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-lg font-semibold">Recent Users</h2>
            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-opacity-90 transition-colors">
              Add New User
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-600">
                  <th className="text-left text-neutral-400 font-medium p-3">Name</th>
                  <th className="text-left text-neutral-400 font-medium p-3">Email</th>
                  <th className="text-left text-neutral-400 font-medium p-3">Phone</th>
                  <th className="text-left text-neutral-400 font-medium p-3">Join Date</th>
                  <th className="text-left text-neutral-400 font-medium p-3">Status</th>
                  <th className="text-left text-neutral-400 font-medium p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-neutral-600 hover:bg-neutral-600">
                    <td className="p-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-neutral-500 rounded-full mr-3"></div>
                        <span className="text-white font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center text-neutral-300">
                        <Mail className="w-4 h-4 mr-2" />
                        {user.email}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center text-neutral-300">
                        <Phone className="w-4 h-4 mr-2" />
                        {user.phone}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center text-neutral-300">
                        <Calendar className="w-4 h-4 mr-2" />
                        {user.joinDate}
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        user.status === 'Active' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button className="text-primary text-sm hover:underline">Edit</button>
                        <button className="text-red-400 text-sm hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 