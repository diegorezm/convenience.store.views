import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import React, { useEffect } from "react";
import { ArrowUpDown } from "lucide-react";
import ProductEntity from "@/models/productEntity";
import { getAllProductEntities } from "@/actions/productEntityActions";
import toast from "react-hot-toast";

type ProductsTypeFilterProps = {
  products: ProductEntity[]
  setProducts: (p: ProductEntity[]) => void
}

export default function ProductsInputFilter({ products, setProducts }: ProductsTypeFilterProps) {
  const searchPossibilities = ["id", "name"]
  const [search, setSearch] = React.useState(searchPossibilities[0])
  const [filter, setFilter] = React.useState("")

  useEffect(() => {
    if (filter == "") {
      rebase()
    }
  }, [filter])

  const rebase = async () => {
    if (!filter) {
      const response = await getAllProductEntities({})
      if ('message' in response) {
        toast.error(response.message)
        return
      }
      setProducts(response)
    }
  }

  const searchById = (id: number): ProductEntity[] => {
    const filteredResults = products.filter(p => p.id === id);
    return filteredResults;
  }


  const searchByName = (name: string): ProductEntity[] => {
    name = name.toLowerCase();
    const filteredResults = products.filter(p => p.name.toLowerCase().includes(name));
    return filteredResults;
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    switch (search) {
      case "id":
        const sResults = searchById(Number.parseInt(filter))
        setProducts(sResults)
        break
      case "name":
        const searchResults = searchByName(filter)
        setProducts(searchResults)
        break
      default:
        break
    }
  }

  return (
    <div className="flex flex-row gap-2 w-3/4 md:w-1/2">
      <form className="w-full" onSubmit={onSubmit}>
        <Input type={search == "id" ? "number" : "text"} placeholder={`Filter by ${search}...`} value={filter} onChange={e => setFilter(e.target.value)} />
      </form>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex flex-row gap-1 ml-auto">
            <ArrowUpDown className="w-5 h-5" /> {search}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {searchPossibilities.map((searchP, i) => {
            return (
              <DropdownMenuCheckboxItem
                key={i}
                className="capitalize"
                checked={searchP === search}
                onCheckedChange={(_) =>
                  setSearch(searchP)
                }
              >
                {searchP}
              </DropdownMenuCheckboxItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
