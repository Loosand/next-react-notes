'use client';

import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'

function Spinner({ active = true }) {
  return (
    <div
      className={['spinner', active && 'spinner--active'].join(' ')}
      role="progressbar"
      aria-busy={active ? 'true' : 'false'}
    />
  );
}

export default function SidebarSearchField() {
  const { replace } = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function handleSearch(term) {
    /**
    * @comment 这里使用 URLSearchParams 对象来处理 URL 查询参数，这样可以更方便地操作 URL 查询参数
    */
    const params = new URLSearchParams(window.location.search)
    if (term) {
      params.set('q', term)
    } else {
      params.delete('q')
    }

    /**
     * @comment 这里使用 useTransition() 来优化用户体验
     */
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <div className="search" role="search">
      <label className="offscreen" htmlFor="sidebar-search-input">
        Search for a note by title
      </label>
      <input
        id="sidebar-search-input"
        placeholder="Search"
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Spinner active={isPending} />
    </div>
  );
}
