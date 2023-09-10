import { zodResolver } from '@hookform/resolvers/zod'
import {
  InputAdornment as MuiInputAdornment,
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
const assignedPersonSchema = z.enum(['person1', 'person2', 'person3', 'none'])
const formInputsSchema = z.object({
  title: z.string().min(1),
  status: statusSchema,
  assignedPerson: assignedPersonSchema.optional(),
  estimatedTime: z.coerce.number().nonnegative(),
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
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    resolver: zodResolver(formInputsSchema),
    defaultValues: {
      title: '',
      status: 'todo',
      assignedPerson: 'none',
      estimatedTime: 0,
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
        render={({ field }) => (
          <MuiTextField
            {...field}
            label="タスク名"
            fullWidth
            error={!!errors.title}
            helperText={errors.title?.message}
          />
        )}
      />
      <Controller
        name="status"
        control={control}
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
      <Controller
        name="assignedPerson"
        control={control}
        render={({ field }) => (
          <MuiSelect {...field} label="担当者" fullWidth>
            <MuiMenuItem value="none">未定</MuiMenuItem>
            <MuiMenuItem value="person1">(担当者名1)</MuiMenuItem>
            <MuiMenuItem value="person2">(担当者名2)</MuiMenuItem>
            <MuiMenuItem value="person3">(担当者名3)</MuiMenuItem>
          </MuiSelect>
        )}
      />
      <Controller
        name="estimatedTime"
        control={control}
        render={({ field }) => (
          <MuiTextField
            {...field}
            label="予想時間"
            fullWidth
            InputProps={{
              endAdornment: (
                <MuiInputAdornment position="end">時間</MuiInputAdornment>
              ),
            }}
            error={!!errors.estimatedTime}
            helperText={errors.estimatedTime?.message}
          />
        )}
      />
    </form>
  )
}
