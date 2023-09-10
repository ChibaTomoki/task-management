import {
  MenuItem as MuiMenuItem,
  Select as MuiSelect,
  TextField as MuiTextField,
} from '@mui/material'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

const statusSchema = z.enum([
  'todo',
  'inProgress',
  'waiting',
  'done',
  'nextTodo',
])
const formInputsSchema = z.object({
  title: z.string().nonempty(),
  status: statusSchema,
})
type FormInputs = z.infer<typeof formInputsSchema>

const taskFormSchema = z.object({
  submit: z.object({
    title: z.string(),
    onclick: z.function().args(formInputsSchema),
    formId: z.string(),
  }),
})
type Props = z.infer<typeof taskFormSchema>

export default function TaskForm({ submit }: Props) {
  const { handleSubmit, control } = useForm<FormInputs>({
    defaultValues: {
      title: '',
      status: 'todo',
    },
  })
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    submit.onclick(data)
  }

  return (
    <form id={submit.formId} onSubmit={(e) => void handleSubmit(onSubmit)(e)}>
      <Controller
        name="title"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <MuiTextField {...field} label="タスク名" fullWidth />
        )}
      />
      <Controller
        name="status"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <MuiSelect {...field} label="ステータス" fullWidth>
            <MuiMenuItem value="todo">TODO</MuiMenuItem>
            <MuiMenuItem value="inProgress">作業中</MuiMenuItem>
            <MuiMenuItem value="waiting">プルリク確認中</MuiMenuItem>
            <MuiMenuItem value="done">完了</MuiMenuItem>
            <MuiMenuItem value="nextTodo">次のTODO</MuiMenuItem>
          </MuiSelect>
        )}
      />
    </form>
  )
}
