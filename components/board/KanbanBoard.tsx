'use client'

import DroppableList from '@/components/board/DroppableList'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { Box as MuiBox } from '@mui/material'
import { ComponentProps, useState } from 'react'

export default function KanbanBoard() {
  const [lists, setLists] = useState<ComponentProps<typeof DroppableList>[]>([
    {
      id: 'list0',
      title: 'TODO',
      cards: [
        { id: 'card0', title: 'タスク0' },
        { id: 'card1', title: 'タスク1' },
        { id: 'card2', title: 'タスク2' },
      ],
    },
    {
      id: 'list1',
      title: '作業中',
      cards: [
        { id: 'card3', title: 'タスク3' },
        { id: 'card4', title: 'タスク4' },
        { id: 'card5', title: 'タスク5' },
      ],
    },
    {
      id: 'list2',
      title: 'プルリク確認中',
      cards: [
        { id: 'card6', title: 'タスク6' },
        { id: 'card7', title: 'タスク7' },
        { id: 'card8', title: 'タスク8' },
      ],
    },
  ])
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) throw new Error('overがnullです')

    if (active.id !== over.id) {
      setLists((lists) => {
        lists.forEach((list) => {
          let activeCardIndex: number | undefined = undefined
          let overCardIndex: number | undefined = undefined
          list.cards.forEach((card, i) => {
            if (card.id === active.id) activeCardIndex = i
            if (card.id === over.id) overCardIndex = i
          })
          if (activeCardIndex !== undefined && overCardIndex !== undefined) {
            list.cards = arrayMove(list.cards, activeCardIndex, overCardIndex)
          }
        })
        return [...lists]
      })
    }
  }
  const handleDragOver = (event: DragOverEvent) => {
    // TODO: リストをまたいでカードを移動するときの処理
    console.dir(event)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <MuiBox sx={{ display: 'flex', gap: '16px' }}>
        {lists.map((list) => (
          <DroppableList
            key={list.id}
            id={list.id}
            title={list.title}
            cards={list.cards}
          />
        ))}
      </MuiBox>
    </DndContext>
  )
}
