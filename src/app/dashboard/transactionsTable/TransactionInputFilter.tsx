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
import toast from "react-hot-toast";
import Transaction from "@/models/transaction";
import { getAllTransactions } from "@/actions/transactionActions";

type ProductsTypeFilterProps = {
  transactions: Transaction[]
  setTransactions: (p: Transaction[]) => void
}

export default function TransactionInputFilter({ transactions, setTransactions}: ProductsTypeFilterProps) {
  const searchPossibilities = ["id", "cpf"]
  const [search, setSearch] = React.useState(searchPossibilities[0])
  const [filter, setFilter] = React.useState("")

  useEffect(() => {
    if(filter === ""){
      rebase()
    }
  }, [filter])

  const searchById = (id: number): Transaction[] => {
    const filteredResults = transactions.filter(p => p.id === id);
    return filteredResults;
  }

  const searchByCpf = (cpf: string): Transaction[] => {
    cpf = cpf.toLowerCase();
    const filteredResults = transactions.filter(p => p.cpf.toLowerCase().includes(cpf));
    return filteredResults;
  }

  const rebase = async () => {
    if (!filter) {
      const response = await getAllTransactions()
      if ('message' in response) {
        toast.error(response.message)
        return
      }
      setTransactions(response)
    }
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    switch (search) {
      case "id":
        const sResults = searchById(Number.parseInt(filter))
        setTransactions(sResults)
        break
      case "cpf":
        const searchResults = searchByCpf(filter)
        setTransactions(searchResults)
        break
      default:
        toast.error("Operation not supported.")
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
