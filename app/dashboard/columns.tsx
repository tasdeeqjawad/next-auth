"use client"

import { ColumnDef } from "@tanstack/react-table"
import { string } from "zod"
import swal from "sweetalert";
//imports for other components
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type People= {
  id: number
//   amount: number
  name: string
//   status: "pending" | "processing" | "success" | "failed"
  email: string
  password: string
}

export const columns: ColumnDef<People>[] = [

  
//   {
//     accessorKey: "status",
//     header: "Status",
//   },
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "password",
    header: "Password",
    cell: ({ row }) => {
      const password = String(row.getValue("password"))
      const formatted = password.toWellFormed()
      return <div className="text-left text-blue-800 font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original
 
      return (
        <DropdownMenu >
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
            <DropdownMenuItem
            onClick={() => alert(`Delete user ${user.name}`)}
            >
              Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
  {
    id: "delete",
    cell: ({ row }) => {
      const user = row.original
 
      return (
        <Button
          variant="ghost"
          // onClick={() => alert(`Delete user ${user.name}`)}
          className="bg-orange-700 text-lg font-bold text-white"
        >
          Delete
        </Button>
      )
    },
  },

]
