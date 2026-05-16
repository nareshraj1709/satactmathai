'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Container from '@/components/ui/Container'
import Eyebrow from '@/components/ui/Eyebrow'

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
    <Container className="py-32 text-center max-w-[400px]">
      <Eyebrow className="mb-4">Authenticating</Eyebrow>
      <div className="font-serif text-[24px]">Signing you in…</div>
    </Container>
  )
}
