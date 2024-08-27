import dayjs from 'dayjs';

/**
 * @mention 这个组件专门用来展示搜索的笔记标题和更新时间
 */
export default function SidebarNoteItemHeader({ title, updateTime }) {
  return (
    <header className="sidebar-note-header">
      <strong>{title}</strong>
      <small>{dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}</small>
    </header>
  );
}