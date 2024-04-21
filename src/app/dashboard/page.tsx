"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductsTable from "./productsTable"
import Transactions from "./transactionsTable"
import { useAuthStore } from "@/lib/useAuthStore"
import { UserRoles } from "@/models/user"
import UsersTable from "./usersTable"

type TabsList = {
  name: string
  value: string
  Component: JSX.ElementType
}

export default function Dashboard() {
  const { user } = useAuthStore()
  // idk why but for some reason i cant just compare the role with UserRoles normally
  // so i had to do this abomination
  const userRole = user.role.toString().toLowerCase()
  const tabsList: TabsList[] = [
    {
      name: "Products",
      value: "products",
      Component: ProductsTable
    },
    {
      name: "Transactions",
      value: "transactions",
      Component: Transactions
    },
    {
      name: "Employees",
      value: "employees",
      Component: UsersTable
    }
  ]
  const compareUserRole = (name: string) => {
    return name.toLowerCase() === "users" && userRole !== UserRoles.ADMIN.toString().toLowerCase()
  }

  return (
    <section>
      <Tabs defaultValue="products" className="w-full">
        <div className="w-full px-4">
          <TabsList>
            {tabsList.map(e => {
              if (compareUserRole(e.name)) return
              return (
                <>
                  <TabsTrigger value={e.value}>{e.name}</TabsTrigger>
                </>
              )
            })}
          </TabsList>
        </div>
        {tabsList.map(e => {
          if (compareUserRole(e.name)) return
          return (
            <>
              <TabsContent value={e.value}>{<e.Component />}</TabsContent>
            </>
          )
        })}
      </Tabs>
    </section>
  )
}
