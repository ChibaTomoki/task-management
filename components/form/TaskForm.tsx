import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box as MuiBox,
  FormControl as MuiFormControl,
  InputAdornment as MuiInputAdornment,
  InputLabel as MuiInputLabel,
  MenuItem as MuiMenuItem,
  Select as MuiSelect,
  TextField as MuiTextField,
} from '@mui/material'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { useId } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import styles from './TaskForm.module.scss'

const statusSchema = z.enum([
  'todo',
  'inProgress',
  'waiting',
  'done',
  'nextTodo',
])
const assignedPersonSchema = z.enum(['person1', 'person2', 'person3', 'none'])
const tagSchema = z.enum(['FE', 'BE', 'none'])

const formInputsSchema = z.object({
  title: z.string().min(1),
  status: statusSchema,
  assignedPerson: assignedPersonSchema.optional(),
  tag: tagSchema,
  estimatedWorkingTime: z.coerce.number().nonnegative(),
  actualWorkingTime: z.coerce.number().nonnegative(),
  startDate: z.coerce.date().nullable(),
  endDate: z.coerce.date().nullable(),
  note: z.string(),
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
  const componentId = useId()
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
      tag: 'none',
      estimatedWorkingTime: 0,
      actualWorkingTime: 0,
      startDate: null,
      endDate: null,
      note: '',
    },
  })
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    submit.onclick(data)
  }

  return (
    <form
      id={submit.formId}
      className={styles.main}
      onSubmit={(e) => void handleSubmit(onSubmit)(e)}
    >
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
          <MuiFormControl fullWidth>
            <MuiInputLabel id={`statusLabelId-${componentId}`}>
              ステータス
            </MuiInputLabel>
            <MuiSelect
              {...field}
              labelId={`statusLabelId-${componentId}`}
              label="ステータス"
            >
              <MuiMenuItem value="todo">TODO</MuiMenuItem>
              <MuiMenuItem value="inProgress">作業中</MuiMenuItem>
              <MuiMenuItem value="waiting">プルリク確認中</MuiMenuItem>
              <MuiMenuItem value="done">完了</MuiMenuItem>
              <MuiMenuItem value="nextTodo">次のTODO</MuiMenuItem>
            </MuiSelect>
          </MuiFormControl>
        )}
      />
      <MuiBox sx={{ display: 'flex', gap: '8px' }}>
        <Controller
          name="assignedPerson"
          control={control}
          render={({ field }) => (
            <MuiFormControl fullWidth>
              <MuiInputLabel id={`assignedPersonLabelId-${componentId}`}>
                担当者
              </MuiInputLabel>
              <MuiSelect
                {...field}
                labelId={`assignedPersonLabelId-${componentId}`}
                label="担当者"
              >
                <MuiMenuItem value="none">未定</MuiMenuItem>
                <MuiMenuItem value="person1">(担当者名1)</MuiMenuItem>
                <MuiMenuItem value="person2">(担当者名2)</MuiMenuItem>
                <MuiMenuItem value="person3">(担当者名3)</MuiMenuItem>
              </MuiSelect>
            </MuiFormControl>
          )}
        />
        <Controller
          name="tag"
          control={control}
          render={({ field }) => (
            <MuiFormControl fullWidth>
              <MuiInputLabel id={`tagLabelId-${componentId}`}>
                タグ
              </MuiInputLabel>
              <MuiSelect
                {...field}
                labelId={`tagLabelId-${componentId}`}
                label="タグ"
                fullWidth
              >
                <MuiMenuItem value="none">無し</MuiMenuItem>
                <MuiMenuItem value="FE">FE</MuiMenuItem>
                <MuiMenuItem value="BE">BE</MuiMenuItem>
              </MuiSelect>
            </MuiFormControl>
          )}
        />
      </MuiBox>
      <MuiBox sx={{ display: 'flex', gap: '8px' }}>
        <Controller
          name="estimatedWorkingTime"
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
              error={!!errors.estimatedWorkingTime}
              helperText={errors.estimatedWorkingTime?.message}
            />
          )}
        />
        <Controller
          name="actualWorkingTime"
          control={control}
          render={({ field }) => (
            <MuiTextField
              {...field}
              label="実作業時間"
              fullWidth
              InputProps={{
                endAdornment: (
                  <MuiInputAdornment position="end">時間</MuiInputAdornment>
                ),
              }}
              error={!!errors.actualWorkingTime}
              helperText={errors.actualWorkingTime?.message}
            />
          )}
        />
      </MuiBox>
      <MuiBox sx={{ display: 'flex', gap: '16px' }}>
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <MuiDatePicker
              {...field}
              label="開始日"
              value={field.value && dayjs(field.value)}
            />
          )}
        />
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <MuiDatePicker
              {...field}
              label="完了日"
              value={field.value && dayjs(field.value)}
            />
          )}
        />
      </MuiBox>
      <Controller
        name="note"
        control={control}
        render={({ field }) => (
          <MuiTextField {...field} label="備考" fullWidth multiline rows={5} />
        )}
      />
    </form>
  )
}
