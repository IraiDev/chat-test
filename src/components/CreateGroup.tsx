import React, { type FormEvent, useState } from "react"
import { HiOutlinePlusSm } from "react-icons/hi"
import { Modal } from "./modal/Modal"
import { MultiSelect } from "./select"
import { Input, Textarea } from "./field"
import { ModalAction } from "./modal/ModalAction"
import { SERVER_CHANNELS } from "../utils/constants"
import {
  type TextareaChangeEvent,
  type InputChangeEvent,
  type MultiSelectChangeEvent,
} from "../utils/types"
import { useChatContext } from "../store/ChatStore"
import { usersOptionsAdapter } from "../utils/functions"

const INIT_FORM_STATE = {
  name: "",
  description: "",
  users: [],
}

const INIT_ERROR_STATE = {
  description: "",
  name: "",
  users: "",
}

export const CreateGroup = () => {
  const { connection, loggedUser, usersList } = useChatContext()
  const [isOpen, setIsOpen] = useState(false)
  const [{ description, name, users }, setForm] = useState(INIT_FORM_STATE)
  const [errors, setErrors] = useState(INIT_ERROR_STATE)

  const handleChange = (
    e: InputChangeEvent | MultiSelectChangeEvent | TextareaChangeEvent
  ) => {
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
    setErrors(INIT_ERROR_STATE)
    setForm(INIT_FORM_STATE)
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const haveEmptyField = Object.values({ description, name, users }).some(
      (value) => value === ""
    )

    if (haveEmptyField) {
      setErrors({
        description: description === "" ? "Obligatorio" : "",
        name: name === "" ? "Obligatorio" : "",
        users: users.length === 0 ? "Obligatorio" : "",
      })
      return
    }

    if (connection === null) return
    connection.emit(SERVER_CHANNELS["create-chat"], {
      description,
      users,
      name,
      isGroup: true,
      token: loggedUser?.token,
    })
    handleReset()
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

      <Modal isOpen={isOpen} onClose={handleReset} title="Nuevo grupo">
        <form
          onSubmit={handleSubmit}
          className="divide-y divide-neutral-300 dark:divide-neutral-600"
        >
          <section className="p-3 py-5 space-y-3 min-w-full">
            <MultiSelect
              name="users"
              value={users}
              onChange={handleChange}
              label="Seleccione usuarios"
              error={errors.users !== ""}
              helperText={errors.users}
              options={usersOptionsAdapter({
                array: usersList,
                loggedUserId: loggedUser?.id ?? 0,
              })}
            />
            <Input
              name="name"
              value={name}
              onChange={handleChange}
              label="Nombre del grupo"
              error={errors.name !== ""}
              helperText={errors.name}
            />
            <Textarea
              name="description"
              value={description}
              onChange={handleChange}
              label="Descripcion"
              error={errors.description !== ""}
              helperText={errors.description}
            />
          </section>
          <ModalAction>
            <button
              type="button"
              onClick={handleReset}
              className="bg-neutral-200 hover:bg-neutral-300 transition-colors
              rounded-xl px-3 py-1.5 font-semibold duration-200 dark:bg-neutral-700
              dark:hover:bg-neutral-600 dark:text-neutral-50"
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
