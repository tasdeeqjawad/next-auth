"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import swal from "sweetalert";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type People = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export const columns: ColumnDef<People>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-1 sm:p-2 text-xs sm:text-sm"
        >
          ID
          <ArrowUpDown className="ml-1 sm:ml-2 h-3 sm:h-4 w-3 sm:w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-1 sm:p-2 text-xs sm:text-sm"
        >
          Name
          <ArrowUpDown className="ml-1 sm:ml-2 h-3 sm:h-4 w-3 sm:w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-1 sm:p-2 text-xs sm:text-sm font-bold"
        >
          Email
          <ArrowUpDown className="ml-1 sm:ml-2 h-3 sm:h-4 w-3 sm:w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "password",
    header: "Password",
    cell: ({ row }) => {
      const password = String(row.getValue("password"));
      const formatted = password.toWellFormed();
      return (
        <div className="text-left text-black font-medium text-xs sm:text-sm truncate">
          {formatted}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-7 sm:h-8 w-7 sm:w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-3 sm:h-4 w-3 sm:w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-xs sm:text-sm">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id.toString())}
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    id: "delete",
    cell: ({ row, table }) => {
      const user = row.original;
      const onDelete = (table.options.meta as any)?.onDelete;
      return (
        <Button
          variant="ghost"
          onClick={() => onDelete?.(user)}
          className="bg-orange-700 text-base sm:text-lg font-bold text-white h-7 sm:h-8 px-2 sm:px-3"
        >
          Delete
        </Button>
      );
    },
  },
];