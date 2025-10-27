import {ChevronLeft, ChevronRight} from "lucide-react";
import {useCallback, useEffect, useState} from "react";
import {
    TransactionResponse,
    useAddTransaction,
    useDeleteTransaction, useEditTransaction, useGetDetailTransaction,
    useGetTransactionHistory
} from "@/app/hooks/queries/useTransaction";
import {formatDate, getDefaultOccurredAt} from "@/app/common/utils";
import ModalBase from "@/app/[locale]/components/modal/ModalBase";
import {useGetMyCategory} from "@/app/hooks/queries/useCategory";
import {QUERY_KEY} from "@/app/hooks/queries/constantQueryKey";
import {useQueryClient} from "@tanstack/react-query";
import LoadingOverlay from "@/app/[locale]/components/LoadingOverlay";


export default function DashboardMobile() {
    const [date, setDate] = useState(new Date());
    const {
        data: transactionHistoriesData,
        isLoading
    } = useGetTransactionHistory({date: date.toISOString().split("T")[0]});
    const {mutate: deleteTransaction} = useDeleteTransaction();
    const {data: myCategories} = useGetMyCategory()
    const [note, setNote] = useState('');
    const [amount, setAmount] = useState(1000);
    const [category, setCategory] = useState(myCategories?.[0]?.id || '');
    const [occurredAt, setOccurredAt] = useState(getDefaultOccurredAt());
    const [transactionId, setTransactionId] = useState('')
    const {data: detailTransaction} = useGetDetailTransaction(transactionId);
    const {mutate: addTransaction} = useAddTransaction();
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const {mutate: editTransaction} = useEditTransaction();
    const goPrev = () => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() - 1);
        setDate(newDate);
    };

    const goNext = () => {
        const newDate = new Date(date);
        newDate.setDate(date.getDate() + 1);
        setDate(newDate);
    };

    useEffect(() => {
        if (!open) {
            setNote('')
            setAmount(1000)
            setCategory(myCategories?.[0]?.id || '')
            setTransactionId('')
        }
    }, [myCategories, open]);

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

    const handleDelete = useCallback((id: string) => {
        if (confirm("Bạn có chắc chắn muốn xóa giao dịch này không?")) {
            deleteTransaction(id, {
                onSuccess: () => {
                    setOpen(false)
                    queryClient.invalidateQueries({queryKey: [QUERY_KEY.GET_TRANSACTION]});
                    queryClient.invalidateQueries({queryKey: [QUERY_KEY.GET_TRANSACTION_HISTORY]});
                },
                onError: () => {
                    alert('Có lỗi xảy ra vui lòng thử lại!');
                },
            });
        }
    }, [deleteTransaction, queryClient]);

    const handleView = useCallback((id: string) => {
        setOpen(true)
        setTransactionId(id)
    }, [])

    useEffect(() => {
        if (transactionId) {
            setNote(detailTransaction?.note || '')
            setAmount(detailTransaction?.amount || 0)
            setCategory(detailTransaction?.splits?.[0]?.categoryId || '')
            setOccurredAt(detailTransaction?.transactionTime || '')
        }

    }, [detailTransaction?.amount, detailTransaction?.note, detailTransaction?.splits, detailTransaction?.transactionTime, transactionId]);
    return (
        <div className={"flex flex-col"}>
            <div className="flex items-center justify-center gap-4 py-3 select-none">
                <button
                    onClick={goPrev}
                    className="p-2 rounded-full hover:bg-neutral-200 active:scale-95 transition"
                >
                    <ChevronLeft size={20}/>
                </button>
                <span className="font-medium text-lg">
        {formatDate(date)}
            </span>

                <button
                    onClick={goNext}
                    className="p-2 rounded-full hover:bg-neutral-200 active:scale-95 transition"
                >
                    <ChevronRight size={20}/>
                </button>
            </div>
            <div className={"flex items-center justify-center"}>
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors duration-200 w-[200px]"
                    onClick={() => setOpen(true)}
                >
                    Thêm chi tiêu
                </button>
            </div>

            {
                isLoading ? <LoadingOverlay isLoading={isLoading}/> : <div className="md:hidden space-y-3 mt-5 p-2">
                    <div className="border rounded-lg p-4">
                        {transactionHistoriesData && transactionHistoriesData?.data && transactionHistoriesData?.data?.length > 0 ? transactionHistoriesData?.data?.map(item => {
                            return (
                                <div key={item.id} className="border rounded-lg p-3 bg-white shadow-sm mb-1"
                                     onClick={() => handleView(item.id)}>
                                    <div className="font-semibold text-base">{item.note}</div>
                                    <div className="text-sm text-gray-600 mt-1">
                                        Giá: <span className="font-medium text-gray-800">{item.amount}</span>
                                    </div>
                                </div>
                            )
                        }) : <div>Không có dữ liệu</div>}

                    </div>

                </div>
            }


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
                        {transactionId && transactionId !== '' && <button
                            type="button"
                            onClick={() => handleDelete(transactionId)}
                            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-500"
                        >
                            Xóa
                        </button>}
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500"
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </ModalBase>

        </div>

    )

}