import React, { Suspense } from 'react'
import Link from 'next/link'
import { getAllNotes } from '@/lib/redis'
import EditButton from '@/components/EditButton';
import SidebarNoteList from '@/components/SidebarNoteList';
import NoteListSkeleton from '@/components/NoteListSkeleton';

export default async function Sidebar() {
  const notes = await getAllNotes()

  return (
    <section className="col sidebar">
      <Link href={'/'} className="link--unstyled">
        <section className="sidebar-header">
          <img
            className="logo"
            src="/logo.svg"
            width="22px"
            height="20px"
            alt=""
            role="presentation"
          />
          <strong>React Notes</strong>
        </section>
      </Link>
      <section className="sidebar-menu" role="menubar">
        <EditButton noteId={null}>New</EditButton>
      </section>
      <nav>
        {/* 在服务端组件使用 Suspense 处理加载状态，但我比较好奇如果是前后端分离项目就只能使用逻辑运算符了吗？🤔 */}
        <Suspense fallback={<NoteListSkeleton />}>
          <SidebarNoteList notes={notes} />
        </Suspense>
      </nav>
    </section>
  )
}
