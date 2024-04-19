"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProductsTable from "./productsTable"
import Transactions from "./transactionsTable"

export default function Dashboard() {
  return (
      <section>
        <Tabs defaultValue="products" className="w-full">
          <div className="w-full px-4">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="products">
            <ProductsTable />
          </TabsContent>
          <TabsContent value="transactions">
            <Transactions />
          </TabsContent>
        </Tabs>
      </section>
  )
}
