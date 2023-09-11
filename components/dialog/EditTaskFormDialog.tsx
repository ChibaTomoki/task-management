import TaskFormDialog, {
  taskFormDialogSchema,
} from '@/components/dialog/TaskFormDialog'
import { z } from 'zod'

const editTaskFormDialogSchema = taskFormDialogSchema
  .omit({
    submit: true,
    title: true,
  })
  .extend({
    submitOnClick: z.function().returns(z.void()),
  })
type Props = z.infer<typeof editTaskFormDialogSchema>

export default function EditTaskFormDialog({ submitOnClick, ...props }: Props) {
  return (
    <TaskFormDialog
      {...props}
      title="編集"
      submit={{ title: '確定', onClick: submitOnClick }}
    />
  )
}
