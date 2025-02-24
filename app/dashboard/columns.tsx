"use client"

import { ColumnDef } from "@tanstack/react-table"

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
  },
]
