'use client'

import SortableCard, {
  sortableCardSchema,
} from '@/components/board/SortableCard'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import { Paper as MuiPaper, Typography as MuiTypography } from '@mui/material'
import { z } from 'zod'

export const droppableListSchema = z.object({
  id: z.string(),
  title: z.string(),
  cards: z.array(sortableCardSchema),
})
type Props = z.infer<typeof droppableListSchema>

export default function DroppableList({ id, title, cards }: Props) {
  const { setNodeRef } = useDroppable({ id })

  return (
    <SortableContext id={id} items={cards} strategy={rectSortingStrategy}>
      <div ref={cards.length ? undefined : setNodeRef}>
        <MuiPaper
          sx={{
            padding: '8px',
            width: '160px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <MuiTypography component="p">{title}</MuiTypography>
          {cards.map((card) => (
            <SortableCard key={card.id} id={card.id} title={card.title} />
          ))}
        </MuiPaper>
      </div>
    </SortableContext>
  )
}
