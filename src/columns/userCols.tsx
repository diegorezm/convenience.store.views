import DropdownUsersCols from "@/components/TablesDropdown/dropdownUsersCol";
import { Button } from "@/components/ui/button";
import User from "@/models/user";
import { ColumnDef } from "@tanstack/react-table";
import { formatDistance } from "date-fns";
import { ArrowUpDown } from "lucide-react";

export const userCols: ColumnDef<User>[] = [
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
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <div className="text-center">
          {column.id}
        </div>
      )
    }
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div className="text-center">
          {column.id}
        </div>
      )
    }
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <div className="text-center">
          {column.id}
        </div>
      )
    },
    cell: ({ row, getValue }) => {
      const val = getValue() as String ?? row.id
      return (
        <div>
          {val.toLowerCase()}
        </div>
      )
    }
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <div className="text-center">
          {column.id}
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
          {column.id}
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
      const u = row.original
      return <DropdownUsersCols  {...u} />
    },
  }
]
