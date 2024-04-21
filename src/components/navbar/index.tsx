"use client"

import { useAuthStore } from "@/lib/useAuthStore"
import ModeToggle from "./modeToggle"
import { LucideIcon, HomeIcon, LogIn, LogOutIcon, SlidersHorizontal } from 'lucide-react'
import Button from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { logout } from "@/actions/userActions"
import toast from "react-hot-toast"

type Tag = {
  name: string
  Icon: LucideIcon
  path: string
}
const noAuth: Tag[] = [
  {
    name: "home",
    Icon: HomeIcon,
    path: "/"
  },
  {
    name: "login",
    Icon: LogIn,
    path: "/login"
  }
]

const tags: Tag[] = [
  {
    name: "home",
    Icon: HomeIcon,
    path: "/"

  },
  {
    name: "dashboard",
    Icon: SlidersHorizontal,
    path: "/dashboard"

  }
]


export default function Navbar() {
  const { userRemove } = useAuthStore()
  const { authorized } = useAuthStore()
  const [links, setLinks] = useState<Tag[]>([])
  const pathName = usePathname()

  const handleLogout = async () => {
    userRemove();
    await logout();
    toast.success("Logged out!")
  }

  useEffect(() => {
    authorized ? setLinks(tags) : setLinks(noAuth)
  }, [authorized])
  return (
    <nav className="flex justify-end p-1 items-center space-x-3">
      <ul className="flex flex-row p-2 gap-5">
        {links.map((e, i) => (
          <li key={i}>
            <Button href={e.path} className={`flex flex-row justify-center items-center text-center  gap-1 text-lg ${pathName === e.path ? "border-b-2 border-b-primary" : ""}`}>
              <e.Icon className="w-5 h-5" /> {e.name}
            </Button>
          </li>
        )
        )}
        {authorized && (
          <li>
            <Button href={"/login"} className="flex flex-row justify-center items-center text-center  gap-1 text-lg" onClick={handleLogout}>
              <LogOutIcon className="w-5 h-5" />
              Logout
            </Button>

          </li>
        )}
      </ul>
      <ModeToggle />
    </nav>
  )
}
