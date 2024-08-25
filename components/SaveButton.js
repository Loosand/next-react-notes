import { useFormStatus } from 'react-dom'

export default function EditButton({ formAction }) {
  const { pending } = useFormStatus()

  return (
    <button
      className="note-editor-done"
      type="submit"
      formAction={formAction}
      disabled={pending}
      role="menuitem"
    >
      <img
        src="/checkmark.svg"
        width="14px"
        height="10px"
        /**
         * @bb 随手写 alt 是个好习惯，即使是教学类项目也不应该空在这里！😠
         */
        alt=""
        role="presentation"
      />
      {pending ? 'Saving' : 'Done'}
    </button>
  );
}
