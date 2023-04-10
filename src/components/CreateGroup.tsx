import { type FormEvent, useState } from "react"
import { HiOutlinePlusSm } from "react-icons/hi"
import { Modal } from "./modal/Modal"
import { MultiSelect } from "./select"
import { Input } from "./field"
import { ModalAction } from "./modal/ModalAction"
import { useSocketStore } from "@/store/SocketStore"
import { SERVER_CHANNELS } from "@/utils/constants"
import {
  type InputChangeEvent,
  type MultiSelectChangeEvent,
} from "@/utils/types"
import { USERS } from "@/store/UserStore"
import { useUser } from "@/hooks"

function formatOptions(array: any[] = [], loggedUser: number) {
  return array
    .filter((item) => item.id !== loggedUser)
    .map((el) => ({
      label: el.name,
      value: el.id,
    }))
}

const INIT_FORM_STATE = {
  name: "",
  description: "",
  users: [],
}

export const CreateGroup = () => {
  const { connection } = useSocketStore()
  const { token = "", id = 0 } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const [{ description, name, users }, setForm] = useState(INIT_FORM_STATE)

  const handleChange = (e: InputChangeEvent | MultiSelectChangeEvent) => {
    const value = e.target.value
    const name = e.target.name
    setForm((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }
  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleReset = () => {
    setIsOpen(false)
    setForm(INIT_FORM_STATE)
  }
  const handleCreateGroup = (e: FormEvent) => {
    e.preventDefault()
    if (connection === null) return
    connection.emit(SERVER_CHANNELS["create-chat"], {
      description,
      users,
      name,
      isGroup: true,
      token,
    })
    setIsOpen(false)
    setForm(INIT_FORM_STATE)
  }
  return (
    <>
      <button
        onClick={handleOpen}
        className="h-7 w-7 grid place-content-center hover:bg-neutral-200
        dark:hover:bg-neutral-700 transition-colors duration-200 rounded-full
        text-xl"
      >
        <HiOutlinePlusSm />
      </button>

      <Modal isOpen={isOpen} onClose={setIsOpen} title="Nuevo grupo">
        <form
          onSubmit={handleCreateGroup}
          className="divide-y divide-neutral-300 dark:divide-neutral-600"
        >
          <section className="p-3 py-5 space-y-3 min-w-full">
            <Input
              name="name"
              value={name}
              onChange={handleChange}
              label="Nombre del grupo"
            />
            <Input
              name="description"
              value={description}
              onChange={handleChange}
              label="Descripcion"
            />
            <MultiSelect
              name="users"
              value={users}
              onChange={handleChange}
              label="Seleccione usuarios"
              options={formatOptions(USERS, id)}
            />
          </section>
          <ModalAction>
            <button
              onClick={handleReset}
              className="bg-neutral-200 hover:bg-neutral-300 transition-colors
              rounded-xl px-3 py-1.5 font-semibold duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-500 transition-colors
              rounded-xl px-3 py-1.5 font-semibold duration-200 text-white"
            >
              Crear Grupo
            </button>
          </ModalAction>
        </form>
      </Modal>
    </>
  )
}
