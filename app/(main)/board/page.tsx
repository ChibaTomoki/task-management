'use client'

import DroppableList from '@/components/board/DroppableList'
import KanbanBoard from '@/components/board/KanbanBoard'
import AddTaskFormDialog from '@/components/dialog/AddTaskFormDialog'
import MuiAddCircle from '@mui/icons-material/Add'
import MuiTimelineIcon from '@mui/icons-material/Timeline'
import { Box as MuiBox, Fab as MuiFab } from '@mui/material'
import { useRouter } from 'next/navigation'
import { ComponentProps, useState } from 'react'

export default function Board() {
  const router = useRouter()

  const [lists, setLists] = useState<ComponentProps<typeof DroppableList>[]>([
    {
      id: 'list0',
      title: 'TODO',
      cards: [
        { id: 'card0', title: 'タスク0' },
        {
          id: 'card1',
          title:
            '文字が多いパターン文字が多いパターン文字が多いパターン文字が多いパターン文字が多いパターン文字が多いパターン文字が多いパターン文字が多いパターン文字が多いパターン文字が多いパターン文字が多いパターン',
        },
        { id: 'card2', title: 'タスク2' },
        { id: 'card3', title: 'タスク3' },
        { id: 'card4', title: 'タスク4' },
        { id: 'card5', title: 'タスク5' },
        { id: 'card6', title: 'タスク6' },
        { id: 'card7', title: 'タスク7' },
        { id: 'card8', title: 'タスク8' },
        { id: 'card9', title: 'タスク9' },
        { id: 'card10', title: 'タスク10' },
        { id: 'card11', title: 'タスク11' },
      ],
    },
    {
      id: 'list1',
      title: '作業中',
      cards: [
        { id: 'card12', title: 'タスク12' },
        { id: 'card13', title: 'タスク13' },
      ],
    },
    {
      id: 'list2',
      title: 'プルリク確認中',
      cards: [{ id: 'card14', title: 'タスク14' }],
    },
    {
      id: 'list3',
      title: '完了',
      cards: [],
    },
    {
      id: 'list4',
      title: '次イテTODO',
      cards: [],
    },
  ])
  const [showsAddTaskFormDialog, setShowsAddTaskFormDialog] = useState(false)

  return (
    <main>
      <MuiBox sx={{ padding: '16px' }}>
        <KanbanBoard lists={lists} setLists={setLists} />
        <MuiFab
          sx={{ position: 'fixed', right: '160px', bottom: '64px' }}
          color="primary"
          onClick={() => setShowsAddTaskFormDialog(true)}
        >
          <MuiAddCircle fontSize="large" />
        </MuiFab>
        <MuiFab
          sx={{ position: 'fixed', right: '64px', bottom: '64px' }}
          color="secondary"
          onClick={() => router.push('/dependency')}
        >
          <MuiTimelineIcon fontSize="large" />
        </MuiFab>
        <AddTaskFormDialog
          isOpen={showsAddTaskFormDialog}
          closeOnClick={() => setShowsAddTaskFormDialog(false)}
          cancelOnClick={() => setShowsAddTaskFormDialog(false)}
          submitOnClick={() => setShowsAddTaskFormDialog(false)}
        />
      </MuiBox>
    </main>
  )
}
