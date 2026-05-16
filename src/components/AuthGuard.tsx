'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/auth')
      } else {
        setReady(true)
      }
    })
  }, [router])

  if (!ready) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-2 border-[color:var(--color-rule)] border-t-[color:var(--color-ink)] rounded-full animate-spin" />
      </div>
    )
  }

  return <>{children}</>
}
