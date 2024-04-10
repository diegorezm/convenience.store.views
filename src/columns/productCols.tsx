import { ColumnDef } from "@tanstack/react-table";
import Product from "@/models/product";

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },

  {
    accessorKey: "entityId",
    header: "Product id",
  },
  {
    accessorKey: "sold",
    header: "Available",
  },
]
