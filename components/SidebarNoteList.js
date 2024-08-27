import SidebarNoteListFilter from '@/components/SidebarNoteListFilter';
import { getAllNotes } from '@/lib/redis';
import SidebarNoteItemHeader from '@/components/SidebarNoteItemHeader';

export default async function NoteList() {
  const notes = await getAllNotes()

  /**
   * @comment 以前我都是用对象的某个关键值判空，但是这里用 Object.entries() 会更好一些，学到了！
   * @comment 还有 ”==“ 判断，虽然说数组的length值必然是数字，但这里用 ”==“ 我还是觉得不太好，毕竟我是个强迫症患者😂
   */
  if (Object.entries(notes).length == 0) {
    return (
      <div className="notes-empty">
        {'No notes created yet!'}
      </div>)
  }

  return (
    <SidebarNoteListFilter notes={
      /**
       * @comment 为什么这里要用 Object.entries() 而不是直接用 notes.map() 呢？
       * @comment 因为 notes是一个对象， Object.entries() 可以将对象转换为数组，这样我们就可以使用数组的 map() 方法了
       */
      Object.entries(notes).map(([noteId, note]) => {
        const noteData = JSON.parse(note)
        return {
          noteId,
          note: noteData,
          header: <SidebarNoteItemHeader title={noteData.title} updateTime={noteData.updateTime} />
        }
      })
    } />
  )
}