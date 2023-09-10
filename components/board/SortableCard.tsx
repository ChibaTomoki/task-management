'use client'

import TaskEditDialog from '@/components/dialog/TaskFormDialog'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  Card as MuiCard,
  CardActionArea as MuiCardActionArea,
  CardContent as MuiCardContent,
  Typography as MuiTypography,
} from '@mui/material'
import { useState } from 'react'
import { z } from 'zod'

export const sortableCardSchema = z.object({
  id: z.string(),
  title: z.string(),
})
type Props = z.infer<typeof sortableCardSchema>

export default function SortableCard({ id, title: name }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })
  const [showsTaskEditDialog, setShowsTaskEditDialog] = useState(false)

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <MuiCard
        sx={{
          width: 320,
          whiteSpace: 'nowrap',
        }}
        elevation={3}
      >
        <MuiCardActionArea onClick={() => setShowsTaskEditDialog(true)}>
          <MuiCardContent>
            <MuiTypography
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
              component="div"
            >
              {name}
            </MuiTypography>
          </MuiCardContent>
        </MuiCardActionArea>
      </MuiCard>
      <TaskEditDialog
        isOpen={showsTaskEditDialog}
        cancelOnClick={() => setShowsTaskEditDialog(false)}
        closeOnClick={() => setShowsTaskEditDialog(false)}
        submitOnClick={() => setShowsTaskEditDialog(false)}
        title="タスク追加/編集"
      />
    </div>
  )
}
