'use client'

import DroppableList, {
  droppableListSchema,
} from '@/components/board/DroppableList'
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
import { useId } from 'react'
import { z } from 'zod'

const boardSchema = z.object({
  lists: z.array(droppableListSchema),
  setLists: z
    .function()
    .args(
      z
        .function()
        .args(z.array(droppableListSchema))
        .returns(z.array(droppableListSchema)),
    ),
})
type Props = z.infer<typeof boardSchema>

export default function KanbanBoard({ lists, setLists }: Props) {
  const componentId = useId()

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  /**
   *
   * @param targetId listId(空のリストにdropしたとき) or cardId
   * @returns list or undefined(見つけられなかった場合)
   */
  const findList = (targetId: string) => {
    if (!targetId) return undefined

    const foundList = lists.find((list) => list.id === targetId)
    if (foundList) return foundList

    const cardWithListId = lists.flatMap((list) =>
      list.cards.map((card) => ({ cardId: card.id, listId: list.id })),
    )
    const listId = cardWithListId.find((x) => x.cardId === targetId)?.listId
    return lists.find((list) => list.id === listId)
  }
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (typeof active.id !== 'string')
      throw new Error('Cardのidはstringにしてください')
    if (!over) return
    if (typeof over.id !== 'string')
      throw new Error('Cardのidはstringにしてください')

    const activeList = findList(active.id)
    const overList = findList(over.id)
    if (!activeList || !overList || activeList !== overList) return

    const activeIndex = activeList.cards.findIndex((x) => x.id === active.id)
    const overIndex = overList.cards.findIndex((x) => x.id === over.id)
    if (activeIndex !== overIndex)
      setLists((prevLists) =>
        prevLists.map((x) => {
          if (x.id === activeList.id) {
            x.cards = arrayMove(overList.cards, activeIndex, overIndex)
            return x
          }
          return x
        }),
      )
  }
  const handleDragOver = (event: DragOverEvent) => {
    const { active, over, delta } = event
    if (typeof active.id !== 'string')
      throw new Error('Cardのidはstringにしてください')
    if (!over) return
    if (typeof over.id !== 'string')
      throw new Error('Cardのidはstringにしてください')

    const activeList = findList(active.id)
    const overList = findList(over.id)
    if (!activeList || !overList || activeList === overList) return

    setLists((prevLists) => {
      const activeListCards = activeList.cards
      const overListCards = overList.cards
      const activeIndex = activeListCards.findIndex((x) => x.id === active.id)
      const overIndex = overListCards.findIndex((x) => x.id === over.id)
      const newIndex = () => {
        const putOnBelowLastItem =
          overIndex === overListCards.length - 1 && delta.y > 0
        const modifier = putOnBelowLastItem ? 1 : 0
        return overIndex >= 0 ? overIndex + modifier : overListCards.length + 1
      }
      return prevLists.map((prevList) => {
        if (prevList.id === activeList.id) {
          prevList.cards = activeListCards.filter((x) => x.id !== active.id)
          return prevList
        }
        if (prevList.id === overList.id)
          prevList.cards = [
            ...overListCards.slice(0, newIndex()),
            activeListCards[activeIndex],
            ...overListCards.slice(newIndex(), overListCards.length),
          ]
        return prevList
      })
    })
  }

  return (
    <DndContext
      id={componentId}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <MuiBox sx={{ display: 'flex', gap: '24px' }}>
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
