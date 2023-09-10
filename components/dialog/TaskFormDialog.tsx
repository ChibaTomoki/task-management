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

const taskEditDialogSchema = z.object({
  isOpen: z.boolean(),
  closeOnClick: z.function(),
  cancelOnClick: z.function(),
  submitOnClick: z.function(),
  title: z.string(),
})
type Props = z.infer<typeof taskEditDialogSchema>

export default function TaskEditDialog({
  isOpen,
  closeOnClick,
  cancelOnClick,
  submitOnClick,
  title: title,
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
              submitOnClick()
            },
            formId,
          }}
        />
      </MuiDialogContent>
      <MuiDialogActions>
        <MuiButton onClick={cancelOnClick}>キャンセル</MuiButton>
        <MuiButton type="submit" form={formId}>
          追加/確定
        </MuiButton>
      </MuiDialogActions>
    </MuiDialog>
  )
}
