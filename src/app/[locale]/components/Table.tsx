"use client";
import {
    useReactTable,
    getCoreRowModel,
    flexRender, ColumnDef,
} from "@tanstack/react-table";
import {useState} from "react";

interface MyTableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData, unknown>[];
    totalPages: number;
}


export default function MyTable<TData>({
                                           data,
                                           columns,
                                           totalPages,
                                       }: MyTableProps<TData>) {
    const [pageIndex] = useState(0);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        pageCount: totalPages,
        state: {pagination: {pageIndex, pageSize: 10}},
        manualPagination: true, // ✅ Bật server mode
        // onPaginationChange: setPagination,
    });


    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700 text-white">
                <thead>
                {table.getHeaderGroups().map((hg) => (
                    <tr key={hg.id}>
                        {hg.headers.map((header) => (
                            <th
                                key={header.id}
                                className="px-4 py-2 text-left"
                            >
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody className="divide-y divide-gray-600">
                {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-neutral-700 cursor-pointer">
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="px-4 py-2">
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex items-center justify-between mt-4 text-sm">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="px-3 py-1 bg-neutral-700 rounded disabled:opacity-50 text-white"
                >
                    Previous
                </button>

                <span className='text-white'>
                    Page{" "}
                    <strong className='text-white'>
                         {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
                    </strong>
                </span>

                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="px-3 py-1 bg-neutral-700 rounded disabled:opacity-50 text-white"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
