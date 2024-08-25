'use server'

import { redirect } from 'next/navigation'
import { addNote, updateNote, delNote } from '@/lib/redis';
import { revalidatePath } from 'next/cache';
import { z } from "zod";

const schema = z.object({
  title: z.string(),
  content: z.string().min(1, '请填写内容').max(100, '字数最多 100')
});

export async function saveNote(prevState, formData) {
  const noteId = formData.get('noteId')
  const data = {
    title: formData.get('title'),
    content: formData.get('body'),
    updateTime: new Date()
  }

  /**
   * @comment 用 zod 做数据校验还真是方便
   */
  const validated = schema.safeParse(data)
  if (!validated.success) {
    return {
      errors: validated.error.issues,
    }
  }

  if (noteId) {
    await updateNote(noteId, JSON.stringify(data))
    /**
     * @comment redirect 和 revalidatePath 的区别是：
     * redirect 会重新加载页面，revalidatePath 则用于重新验证和更新特定路径的静态生成页面
     */
    revalidatePath('/', 'layout')
  } else {
    await addNote(JSON.stringify(data))
    revalidatePath('/', 'layout')
  }

  return { message: `Add Success!` }
}

export async function deleteNote(prevState, formData) {
  const noteId = formData.get('noteId')
  delNote(noteId)
  revalidatePath('/', 'layout')
  /**
   * @comment 这里为什么要 redirect('/') 呢？
   * 因为删除后，不同于编辑笔记，没有什么可以展示的内容，所以直接跳转到首页
   */
  redirect('/')
}