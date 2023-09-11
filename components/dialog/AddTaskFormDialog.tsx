import TaskFormDialog, {
  taskFormDialogSchema,
} from '@/components/dialog/TaskFormDialog'
import { z } from 'zod'

const addTaskDialogSchema = taskFormDialogSchema
  .omit({
    submit: true,
    title: true,
  })
  .extend({
    submitOnClick: z.function().returns(z.void()),
  })
type Props = z.infer<typeof addTaskDialogSchema>

export default function AddTaskFormDialog({ submitOnClick, ...props }: Props) {
  return (
    <TaskFormDialog
      {...props}
      title="追加"
      submit={{ title: '追加', onClick: submitOnClick }}
    />
  )
}
