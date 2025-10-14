"use client";
import {
    useReactTable,
    getCoreRowModel,
    flexRender, ColumnDef,
} from "@tanstack/react-table";

interface MyTableProps<TData> {
    data: TData[];
    columns: ColumnDef<TData, unknown>[];
}


export default function MyTable<TData>({
                                           data,
                                           columns
                                       }: MyTableProps<TData>) {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
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
        </div>
    );
}
