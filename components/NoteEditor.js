'use client'

import { useState, useEffect } from 'react'
import NotePreview from '@/components/NotePreview'
/**
 * @comment 关于 useFormState 更多细则可以看 https://react.dev/blog/2024/04/25/react-19#new-hook-useactionstate
 */
import { useFormState } from 'react-dom'
import { deleteNote, saveNote } from '../app/actions'
import SaveButton from '@/components/SaveButton'
import DeleteButton from '@/components/DeleteButton'

const initialState = {
  message: null,
}

/**
 * https://juejin.cn/book/7307859898316881957/section/7309114647013228570
 * @comment 才知道可以用fromAction来指定form的action，以前都是用onSubmit或者onClick来触发事件，但这样做既不够语义化，UI也不会刷新
 * 另外就是是用hidden input来传递noteId，这样就不用在url中传递noteId了。 妙啊！
 * 
 */
export default function NoteEditor({
  noteId,
  initialTitle,
  initialBody
}) {
  /**
   * @comment React 的 useFormState 和 useFormStatus 非常适合搭配 Server Actions 使用。
   * useFormState 用于根据 form action 的结果更新表单状态，useFormStatus 用于在提交表单时显示待处理状态。
   */
  const [saveState, saveFormAction] = useFormState(saveNote, initialState)
  const [delState, delFormAction] = useFormState(deleteNote, initialState)

  const [title, setTitle] = useState(initialTitle)
  const [body, setBody] = useState(initialBody)
  const isDraft = !noteId

  useEffect(() => {
    if (saveState.errors) {
      console.log(saveState.errors)
    }
  }, [saveState])

  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off">
        <div className="note-editor-menu" role="menubar">
          <input type="hidden" name="noteId" value={noteId} />
          <SaveButton formAction={saveFormAction} />
          <DeleteButton isDraft={isDraft} formAction={delFormAction} />
        </div>
        <div className="note-editor-menu">
          {saveState?.message}
          {saveState.errors && saveState.errors[0].message}
        </div>
        <label className="offscreen" htmlFor="note-title-input">
          Enter a title for your note
        </label>
        <input
          id="note-title-input"
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />
        <label className="offscreen" htmlFor="note-body-input">
          Enter the body for your note
        </label>
        <textarea
          name="body"
          value={body}
          id="note-body-input"
          onChange={(e) => setBody(e.target.value)}
        />
      </form>
      <div className="note-editor-preview">
        <div className="label label--preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  )
}

