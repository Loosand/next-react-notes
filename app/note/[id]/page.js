import Note from '@/components/Note'
import { getNote } from '@/lib/redis';

export default async function Page({ params }) {
  const noteId = params.id;
  const note = await getNote(noteId)

  if (note == null) {
    return (
      <div className="note--empty-state">
        <span className="note-text--empty-state">
          Click a note on the left to view something! 🥺
        </span>
      </div>
    )
  }

  /**
   * @comment 这里没有用 Suspense 是因为可以使用 loading.js 来处理 loading 状态
   * 🤔 两者在表现上好像没有太多的分别
   */
  return <Note noteId={noteId} note={note} />
}

