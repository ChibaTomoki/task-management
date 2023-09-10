'use client'

import DroppableList from '@/components/board/DroppableList'
import KanbanBoard from '@/components/board/KanbanBoard'
import { ComponentProps, useState } from 'react'

export default function Board() {
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

  return (
    <main>
      <p>ボード形式のタスクリスト</p>
      <KanbanBoard lists={lists} setLists={setLists} />
    </main>
  )
}
