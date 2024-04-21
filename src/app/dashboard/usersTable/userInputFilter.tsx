import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown } from "lucide-react";
import { getAllUsers } from "@/actions/userActions"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import User from "@/models/user"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import toast from "react-hot-toast"

type Props = {
  users: User[]
  setUsers: Dispatch<SetStateAction<User[]>>
}
export default function UserInputFilter({ users, setUsers }: Props) {

  const searchPossibilities = ["username", "id"]

  const [search, setSearch] = useState(searchPossibilities[0])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    if(filter === ""){
      rebase()
    }
  }, [filter])

  const rebase = async () => {
    if (!filter) {
      const response = await getAllUsers({})
      if ('message' in response) {
        toast.error(response.message)
        return
      }
      setUsers(response)
    }
  }

  const searchByUsername = (username: string) => {
    username = username.toLowerCase()
    return users.filter(u => u.username.toLowerCase().includes(username))
  }

  const searchById = (id: number) => {
    return users.filter(u => u.id === id)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    switch (search) {
      case "id":
        const sResults = searchById(Number.parseInt(filter))
        setUsers(sResults)
        break
      case "username":
        const searchResults = searchByUsername(filter)
        setUsers(searchResults)
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
