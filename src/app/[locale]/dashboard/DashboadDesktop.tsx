'use client';

import {DashboardLayout} from '../components/layout';
import MetricCard from '../components/MetricCard';
import {useTranslations} from 'next-intl';
import {useCallback, useEffect, useMemo, useState} from 'react';
import Image from 'next/image';
import ExpenseCalendar from '@/app/[locale]/components/ExpenseCalendar';
import ModalBase from '@/app/[locale]/components/modal/ModalBase';
import {
    TransactionHistoryResponse,
    TransactionResponse,
    useAddTransaction, useDeleteTransaction, useEditTransaction,
    useGetCategoriesForTransaction, useGetDashboard, useGetDetailTransaction,
    useGetTransaction,
    useGetTransactionHistory
} from '@/app/hooks/queries/useTransaction';
import {useGetMyCategory} from "@/app/hooks/queries/useCategory";
import {getCurrentMonthRange, getDefaultOccurredAt} from "@/app/common/utils";
import {QUERY_KEY} from "@/app/hooks/queries/constantQueryKey";
import {useQueryClient} from "@tanstack/react-query";
import MyTable from "@/app/[locale]/components/Table";
import {ColumnDef} from "@tanstack/react-table";
import {Eye, Pencil, Trash2} from "lucide-react";


export default function DashboardDesktop() {
    const t = useTranslations();
    const {startDate: defaultStart, endDate: defaultEnd} = getCurrentMonthRange();
    const queryClient = useQueryClient();
    const [transactionId, setTransactionId] = useState('')
    // API
    const {data: myCategories} = useGetMyCategory()

    const {mutate: addTransaction} = useAddTransaction();
    const {mutate: editTransaction} = useEditTransaction();
    const {mutate: deleteTransaction} = useDeleteTransaction();
    const {data: detailTransaction} = useGetDetailTransaction(transactionId);
    const {data: transactionHistoriesData} = useGetTransactionHistory({})
    const [startDate] = useState(defaultStart);
    const [endDate] = useState(defaultEnd);
    const {data} = useGetTransaction({
        startDate,
        endDate,
    });
    const {data: myCategoriesForTransaction} = useGetCategoriesForTransaction({
        startDate,
        endDate,
    })

    const {data: myDashboard} = useGetDashboard({
        startDate,
        endDate,
    })
    // State

    const [note, setNote] = useState('');
    const [amount, setAmount] = useState(1000);
    const [category, setCategory] = useState(myCategories?.[0]?.id || '');
    const [occurredAt, setOccurredAt] = useState(getDefaultOccurredAt());

    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (open && transactionId) {
            setNote(detailTransaction?.note || '')
            setAmount(detailTransaction?.amount || 0)
            setCategory(detailTransaction?.splits?.[0]?.categoryId || '')
            setOccurredAt(detailTransaction?.transactionTime || '')
        }
    }, [detailTransaction?.amount, detailTransaction?.note, detailTransaction?.splits, detailTransaction?.transactionTime, open, transactionId]);

    useEffect(() => {
        if (!open) {
            setNote('')
            setAmount(1000)
            setCategory(myCategories?.[0]?.id || '')
            setTransactionId('')
        }
    }, [myCategories, open]);

    useEffect(() => {
        if (transactionId) {
            setNote(detailTransaction?.note || '')
            setAmount(detailTransaction?.amount || 0)
            setCategory(detailTransaction?.splits?.[0]?.categoryId || '')
            setOccurredAt(detailTransaction?.transactionTime || '')
        }

    }, [detailTransaction?.amount, detailTransaction?.note, detailTransaction?.splits, detailTransaction?.transactionTime, transactionId]);

    const getDashboard = useMemo(() => {
        const metrics = [
            {
                title: t('total'),
                value: `${myDashboard?.summary?.total?.toLocaleString('vi-VN')} đ`,
                change: `${myDashboard?.summary?.totalChange?.toLocaleString('vi-VN') ?? '0'}%`,
                isPositive: true
            },
            {
                title: t('target'),
                value: 0,
                change: '0%',
                isPositive: false
            },
            {
                title: t('balance'),
                value: myDashboard?.summary?.balance?.toLocaleString('vi-VN') ?? '0',
                change: `${myDashboard?.summary?.balanceChange?.toLocaleString('vi-VN') ?? '0'}%`,
                isPositive: true
            },
            {
                title: t('today'),
                value: myDashboard?.summary?.today?.toLocaleString('vi-VN') ?? '0',
                change: `${myDashboard?.summary?.todayChange?.toLocaleString('vi-VN') ?? '0'}%`,
                isPositive: myDashboard?.summary?.todayChange && myDashboard?.summary?.today ? myDashboard?.summary?.today < myDashboard?.summary?.todayChange : false,
            },
        ];
        return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
                <MetricCard
                    key={index}
                    title={metric.title}
                    value={String(metric.value)}
                    change={String(metric.change)}
                    isPositive={metric.isPositive}
                />
            ))}
        </div>
    }, [myDashboard?.summary?.balance, myDashboard?.summary?.balanceChange, myDashboard?.summary?.today, myDashboard?.summary?.todayChange, myDashboard?.summary?.total, myDashboard?.summary?.totalChange, t])


    const handleSubmit = useCallback(() => {
        if (transactionId && transactionId !== '') {
            editTransaction(
                {categoryId: category, amount, occurredAt, note, id: transactionId},
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({queryKey: [QUERY_KEY.GET_TRANSACTION]});
                        queryClient.invalidateQueries({queryKey: [QUERY_KEY.GET_TRANSACTION_HISTORY]});
                        setOpen(false)
                    },
                    onError() {
                        alert('Có lỗi xảy ra vui lòng thử lại!');
                    },
                }
            );
        } else {
            addTransaction(
                {categoryId: category, amount, occurredAt, note},
                {
                    onSuccess: (data: TransactionResponse) => {
                        console.log(data)
                        queryClient.invalidateQueries({queryKey: [QUERY_KEY.GET_TRANSACTION]});
                        queryClient.invalidateQueries({queryKey: [QUERY_KEY.GET_TRANSACTION_HISTORY]});
                        queryClient.invalidateQueries({queryKey: [QUERY_KEY.GET_DASHBOARD]});
                        queryClient.invalidateQueries({queryKey: [QUERY_KEY.GET_CATEGORIES]});
                        setOpen(false)
                    },
                    onError() {
                        alert('Có lỗi xảy ra vui lòng thử lại!');
                    },
                }
            )
        }
    }, [addTransaction, amount, category, editTransaction, note, occurredAt, queryClient, transactionId])


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

    const handleView = useCallback((id: string) => {
        setTransactionId(id)
        setOpen(true)
    }, [])


    const handleDelete = useCallback((id: string) => {
        if (confirm("Bạn có chắc chắn muốn xóa giao dịch này không?")) {
            deleteTransaction(id, {
                onSuccess: () => {
                    queryClient.invalidateQueries({queryKey: [QUERY_KEY.GET_TRANSACTION]});
                    queryClient.invalidateQueries({queryKey: [QUERY_KEY.GET_TRANSACTION_HISTORY]});
                },
                onError: () => {
                    alert('Có lỗi xảy ra vui lòng thử lại!');
                },
            });
        }
    }, [deleteTransaction, queryClient]);


    const getDataCalendar = useMemo(() => {
        if (!data || !Array.isArray(data)) {
            return {};
        }

        return (data as { date: string; totalAmount: string }[]).reduce(
            (acc, row) => {
                const dateKey = new Date(row.date).toLocaleDateString('en-CA');
                acc[dateKey] = parseFloat(row.totalAmount);
                return acc;
            },
            {} as Record<string, number>
        );
    }, [data]);

    const columns = useMemo<ColumnDef<TransactionHistoryResponse>[]>(
        () => [
            {accessorKey: "note", header: "Tên"},
            {
                header: "Loại",
                cell: ({row}) => {
                    const type = row.original.type === 'EXPENSE' ? 'Tiền tiêu' : 'Tiền thu'

                    return <span>{type || "—"}</span>;
                },
            },
            {
                accessorKey: "amount",
                header: "Số tiền",
                cell: ({getValue}) => {
                    const val = getValue<number>();
                    return val.toLocaleString('vi-VN');
                },
            },
            {
                header: "Danh mục",
                cell: ({row}) => {
                    const categories = row.original.splits
                        ?.map((s) => s.category.name)
                        .join(", ");
                    return <span>{categories || "—"}</span>;
                },
            },
            {accessorKey: "transactionDate", header: "Ngày"},
            {
                id: "actions", // ✅ id tự đặt
                header: "Hành động",
                cell: ({row}) => (
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleView(row.original?.id)}
                            className="text-blue-400 hover:text-blue-300"
                            title="Xem"
                        >
                            <Eye size={18}/>
                        </button>
                        <button
                            onClick={() => handleView(row.original?.id)}
                            className="text-yellow-400 hover:text-yellow-300"
                            title="Sửa"
                        >
                            <Pencil size={18}/>
                        </button>
                        <button
                            onClick={() => handleDelete(row.original.id)}
                            className="text-red-500 hover:text-red-400"
                            title="Xóa"
                        >
                            <Trash2 size={18}/>
                        </button>
                    </div>
                ),
            },
        ],
        [handleDelete, handleView]
    );


    const getCard = useMemo(() => {
        return myCategoriesForTransaction && myCategoriesForTransaction.map((item, index) => {
            return (
                <div
                    key={index}
                    className="flex items-center gap-3 border border-neutral-700 rounded-md p-3 bg-neutral-800 text-white"
                >
                    <div className="bg-neutral-700 p-2 rounded-md">
                        {/* Ảnh icon */}
                        <Image src={'/assets/img/house.png'} alt="A" width={28} height={28} unoptimized/>
                    </div>
                    <div>
                        <h3 className="font-semibold">{item.categoryName}</h3>
                        <p className="text-blue-300 font-medium">{item.totalAmount.toLocaleString()} đ</p>
                    </div>
                </div>
            );
        });
    }, [myCategoriesForTransaction]);
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
            {getDashboard}
            <div className="flex justify-between gap-1">
                <div className="text-white w-[60%] border px-4 py-2">
                    <div className="px-2 pt-2 pb-4 flex justify-between items-center">
                        <p>Danh sách mục chi tiêu tháng</p>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-200"
                            onClick={() => setOpen(true)}
                        >
                            Chi tiêu
                        </button>
                    </div>
                    {getCard}
                </div>
                <div className="min-w-[500px]">
                    <ExpenseCalendar expenses={getDataCalendar}/>
                </div>
            </div>

            <div>
                <p>History</p>
                {(transactionHistoriesData?.data?.length ?? 0) > 0 && (
                    <MyTable data={transactionHistoriesData ? transactionHistoriesData.data! : []} columns={columns}
                             totalPages={transactionHistoriesData?.totalPage || 0}/>
                )}
            </div>
            <ModalBase open={open} onClose={() => setOpen(false)}>
                <h2 className="text-white text-lg font-semibold mb-4">
                    Thêm mục chi tiêu
                </h2>

                {/* FORM */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();

                    }}
                    className="flex flex-col gap-4"
                >
                    {/* Ô nhập tên */}
                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1 text-sm">Tên chi tiêu</label>
                        <input
                            type="text"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Ví dụ: Mua cà phê"
                            className="rounded-md px-3 py-2 bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Ô chọn danh mục */}
                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1 text-sm">Danh mục</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="rounded-md px-3 py-2 bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            {myCategories?.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Ô nhập số tiền */}
                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1 text-sm">Số tiền</label>
                        <input
                            type="number"
                            value={amount}
                            min={1000}
                            onChange={(e) => setAmount(Number(e.target.value))}
                            placeholder="200000"
                            className="rounded-md px-3 py-2 bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-300 mb-1 text-sm">Ngày chi tiêu</label>
                        <input
                            type="datetime-local"
                            value={occurredAt ? occurredAt.slice(0, 16) : ''}
                            onChange={(e) => {
                                const local = e.target.value;
                                const fullDateTime = `${local}:00+07:00`;
                                setOccurredAt(fullDateTime);
                            }}
                            className="rounded-md px-3 py-2 bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Nút hành động */}
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="px-4 py-2 rounded-md bg-neutral-600 text-white hover:bg-neutral-500"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </ModalBase>
        </DashboardLayout>

    );
}
