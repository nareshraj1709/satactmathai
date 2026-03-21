'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const onboarded = localStorage.getItem('satact_onboarded')
        router.push(onboarded ? '/dashboard' : '/onboarding')
      } else {
        router.push('/auth')
      }
    })
  }, [router])

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <p style={{ color: '#64748B', fontSize: 16 }}>Signing you in...</p>
    </div>
  )
}
