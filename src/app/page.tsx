import { LucideIcon, Receipt, ShoppingBasket, ShoppingCart, Users } from "lucide-react"

export default function Home() {
  type Action = {
    description: string,
    Icon: LucideIcon
  }
  const actionList: Action[] = [{
    description: "Ability to have full control of every item inside that the store has in stock.",
    Icon: ShoppingCart
  },
  {
    description: "Ability to have full control of the every transaction made in the store.",
    Icon: ShoppingBasket
  },
  {
    description: "Ability to generate the receipts for every transaction.",
    Icon: Receipt
  },
  {
    description: "Manage all the employees.",
    Icon: Users
  },
  ]
  return (
    <section className="p-4">
      <div>
        <h1 className="text-4xl text-primary text-center">Convenience Store Api</h1>
      </div>
      <div className="w-full flex justify-center">
        <div className="flex flex-col justify-center items-center my-10 border border-border p-4 rounded-[var(--radius)] w-[80%] 2xl:w-1/2">
          <div className="w-full">
            <h2 className="text-2xl">Features: </h2>
          </div>
          <ul className="grid grid-cols-2 gap-10 my-5 w-full items-center">
            {actionList.map((e, i) => {
              return (
                <li key={i} className="flex flex-row gap-5 items-center justify-start">
                  <e.Icon className="h-10 w-10" />
                  <p>{e.description}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
