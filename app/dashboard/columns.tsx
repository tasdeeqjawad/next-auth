"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { string } from "zod";
import swal from "sweetalert";
import { MoreHorizontal } from "lucide-react";
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
    header: ({column}) =>{
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
          className="items-bold"
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
      return <div className="text-left text-blue-800 font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
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
  // CHANGED: Updated delete column to use onDelete from table meta
  {
    id: "delete",
    cell: ({ row, table }) => {
      const user = row.original;
      const onDelete = (table.options.meta as any)?.onDelete; // CHANGED: Access onDelete from meta
      return (
        <Button
          variant="ghost"
          onClick={() => onDelete?.(user)} // CHANGED: Call onDelete with user
          className="bg-orange-700 text-lg font-bold text-white"
        >
          Delete
        </Button>
      );
    },
  },
];