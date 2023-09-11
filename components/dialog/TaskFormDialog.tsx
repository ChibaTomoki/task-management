import {
  Button as MuiButton,
  Dialog as MuiDialog,
  DialogActions as MuiDialogActions,
  DialogContent as MuiDialogContent,
  DialogTitle as MuiDialogTitle,
} from '@mui/material'
import { useId } from 'react'
import { z } from 'zod'
import TaskForm from '../form/TaskForm'

export const taskFormDialogSchema = z.object({
  isOpen: z.boolean(),
  closeOnClick: z.function().returns(z.void()),
  cancelOnClick: z.function().returns(z.void()),
  submit: z.object({
    title: z.string(),
    onClick: z.function().returns(z.void()),
  }),
  title: z.string(),
})
type Props = z.infer<typeof taskFormDialogSchema>

export default function TaskEditDialog({
  isOpen,
  closeOnClick,
  cancelOnClick,
  submit,
  title,
}: Props) {
  const formId = useId()

  return (
    <MuiDialog open={isOpen} onClose={closeOnClick}>
      <MuiDialogTitle>{title}</MuiDialogTitle>
      <MuiDialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
      >
        <TaskForm
          submit={{
            title: '追加/確定',
            onclick: (inputValues) => {
              console.dir(inputValues)
              submit.onClick()
            },
            formId,
          }}
        />
      </MuiDialogContent>
      <MuiDialogActions>
        <MuiButton onClick={cancelOnClick}>キャンセル</MuiButton>
        <MuiButton type="submit" form={formId}>
          {submit.title}
        </MuiButton>
      </MuiDialogActions>
    </MuiDialog>
  )
}
