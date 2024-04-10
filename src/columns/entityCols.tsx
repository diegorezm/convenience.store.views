"use client"
import { ColumnDef } from "@tanstack/react-table";
import ProductEntity from "@/models/productEntity";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import DropdownColumnEntity from "@/components/productEntityModal/dropdownColumn";

export const entityColumns: ColumnDef<ProductEntity>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Id
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
  },

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const day = row.getValue("createdAt") as Date
      const d = formatDistance(day, new Date(), { addSuffix: true })
      return <div>{d}</div>
    }
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Updated
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const day = row.getValue("updatedAt") as Date
      const d = formatDistance(day, new Date(), { addSuffix: true })
      return <div>{d}</div>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const entity = row.original
      return <DropdownColumnEntity product={entity} />
    },
  },
]
