import {
  Button as MuiButton,
  Dialog as MuiDialog,
  DialogActions as MuiDialogActions,
  DialogContent as MuiDialogContent,
  DialogTitle as MuiDialogTitle,
  MenuItem as MuiMenuItem,
  Select as MuiSelect,
  TextField as MuiTextField,
} from '@mui/material'
import { useState } from 'react'
import { z } from 'zod'

const statusSchema = z.enum([
  'todo',
  'inProgress',
  'waiting',
  'done',
  'nextTodo',
])
type Status = z.infer<typeof statusSchema>

const taskEditDialogSchema = z.object({
  isOpen: z.boolean(),
  closeOnClick: z.function(),
  cancelOnClick: z.function(),
  submitOnClick: z.function(),
  dialogTitle: z.string(),
})
type Props = z.infer<typeof taskEditDialogSchema>

export default function TaskEditDialog({
  isOpen,
  closeOnClick,
  cancelOnClick,
  submitOnClick,
  dialogTitle,
}: Props) {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState<Status>('todo')

  return (
    <div>
      <MuiDialog open={isOpen} onClose={closeOnClick}>
        <MuiDialogTitle>{dialogTitle}</MuiDialogTitle>
        <MuiDialogContent
          sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
        >
          <MuiTextField
            autoFocus
            margin="dense"
            id="title"
            label="タイトル"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
            }}
          />
          <MuiSelect
            labelId="status"
            id="status"
            value={status}
            label="ステータス"
            fullWidth
            onChange={(e) => {
              setStatus(statusSchema.parse(e.target.value))
            }}
          >
            <MuiMenuItem value="todo">TODO</MuiMenuItem>
            <MuiMenuItem value="inProgress">作業中</MuiMenuItem>
            <MuiMenuItem value="waiting">プルリク確認中</MuiMenuItem>
            <MuiMenuItem value="done">完了</MuiMenuItem>
            <MuiMenuItem value="nextTodo">次のTODO</MuiMenuItem>
          </MuiSelect>
        </MuiDialogContent>
        <MuiDialogActions>
          <MuiButton onClick={cancelOnClick}>キャンセル</MuiButton>
          <MuiButton onClick={submitOnClick}>追加/確定</MuiButton>
        </MuiDialogActions>
      </MuiDialog>
    </div>
  )
}
