'use client'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  Card as MuiCard,
  CardActionArea as MuiCardActionArea,
  CardContent as MuiCardContent,
  Typography as MuiTypography,
} from '@mui/material'
import { z } from 'zod'

export const sortableCardSchema = z.object({
  id: z.string(),
  title: z.string(),
})
type Props = z.infer<typeof sortableCardSchema>

export default function SortableCard({ id, title: name }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <MuiCard
        sx={{
          maxWidth: 345,
        }}
        elevation={3}
      >
        <MuiCardActionArea>
          <MuiCardContent>
            <MuiTypography gutterBottom component="div">
              {name}
            </MuiTypography>
          </MuiCardContent>
        </MuiCardActionArea>
      </MuiCard>
    </div>
  )
}
