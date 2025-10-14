'use client';

import { DashboardLayout } from '../components/layout';
import MetricCard from '../components/MetricCard';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import ExpenseCalendar from '@/app/[locale]/components/ExpenseCalendar';
import ModalBase from '@/app/[locale]/components/modal/ModalBase';
import { SquarePen, Trash2 } from 'lucide-react';
import { useGetTransaction } from '@/app/hooks/queries/useTransaction';
export default function Dashboard() {
  const t = useTranslations();
  const [startDate] = useState('2025-06-01');
  const [endDate] = useState('2025-10-10');
  const { data } = useGetTransaction({
    startDate,
    endDate,
  });

  const [open, setOpen] = useState(false);
  const metrics = [
    { title: t('total'), value: '50.8K', change: '28.4%', isPositive: true },
    { title: t('target'), value: '23.6K', change: '12.6%', isPositive: false },
    { title: t('balance'), value: '756', change: '3.1%', isPositive: true },
    { title: t('today'), value: '2.3K', change: '11.3%', isPositive: true },
  ];

  // const recentOrders = [
  //   { order: '#1532', date: 'Dec 30, 10:06 AM', status: 'Paid', total: '$329.40' },
  //   { order: '#1531', date: 'Dec 29, 2:59 AM', status: 'Pending', total: '$117.24' },
  // ];

  const handleNavChange = (nav: string) => {
    console.log('Navigation changed to:', nav);
    // Here you can add navigation logic
  };

  const handleExport = () => {
    console.log('Export data clicked');
    // Add export logic here
  };

  const handleCreateReport = () => {
    console.log('Create report clicked');
    // Add create report logic here
  };

  const getDataCalendar = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return {};
    }

    return (data as { date: string; totalAmount: string }[]).reduce(
      (acc, row) => {
        const dateKey = new Date(row.date).toISOString().split('T')[0];
        acc[dateKey] = parseFloat(row.totalAmount);
        return acc;
      },
      {} as Record<string, number>
    );
  }, [data]);

  const getCard = useMemo(() => {
    const data = [
      {
        title: 'A',
        name: 'A',
        icon: '/assets/img/house.png',
        date: '18/06/2025',
        price: '2,000,000',
      },
      {
        title: 'B',
        name: 'B',
        icon: '/assets/img/house.png',
        date: '19/06/2025',
        price: '1,500,000',
      },
    ];

    return data.map((item, index) => {
      return (
        <div
          key={index}
          className="flex items-center gap-3 border border-neutral-700 rounded-md p-3 bg-neutral-800 text-white"
        >
          <div className="bg-neutral-700 p-2 rounded-md">
            {/* Ảnh icon */}
            <Image src={item.icon} alt="A" width={28} height={28} unoptimized />
          </div>
          <div>
            <h3 className="font-semibold">{item.title}</h3>
            <p className="text-sm text-neutral-400">{item.date}</p>
            <p className="text-blue-300 font-medium">{item.price} đ</p>
          </div>
        </div>
      );
    });
  }, []);

  return (
    <DashboardLayout
      activeNav="Reports"
      title="Welcome back, John"
      subtitle="Measure your advertising ROI and report website traffic."
      userName="John"
      onNavChange={handleNavChange}
      onExport={handleExport}
      onCreateReport={handleCreateReport}
    >
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            isPositive={metric.isPositive}
          />
        ))}
      </div>
      <div className="flex justify-between gap-1">
        <div className="text-white w-[60%] border px-4 py-2">
          <div className="px-2 pt-2 pb-4 flex justify-between items-center">
            <p>Danh sách mục chi tiêu tháng</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setOpen(true)}
            >
              Chi tiêu
            </button>
          </div>
          {getCard}
        </div>
        <div className="min-w-[500px]">
          <ExpenseCalendar expenses={getDataCalendar} />
        </div>
      </div>

      <ModalBase open={open} onClose={() => setOpen(false)}>
        <h2 className="text-white text-lg font-semibold mb-2 ">
          Chi tiết mục chi tiêu
        </h2>
        <div className="flex justify-around">
          <button
            onClick={() => setOpen(false)}
            className="rounded-md bg-gray-200 px-3 py-1 hover:bg-gray-300 flex flex-row items-center gap-1"
          >
            <SquarePen />
            Sửa
          </button>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md bg-gray-200 px-3 py-1 hover:bg-gray-300 flex flex-row items-center gap-1"
          >
            <Trash2 />
            Xóa
          </button>
        </div>
      </ModalBase>
    </DashboardLayout>
  );
}
