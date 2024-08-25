import NoteEditor from '@/components/NoteEditor'

export default async function EditPage() {
  /**
   * @comment 他这里的 props 默认值都是在 NoteEditor 组件中设置的，学到了
   */
  return <NoteEditor note={null} initialTitle="Untitled" initialBody="" />
}
