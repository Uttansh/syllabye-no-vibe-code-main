'use client';
 
import { Button } from '@/components/ui/button';
import { useEffect } from 'react'
import Link from 'next/link';
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="min-h-svh flex flex-col justify-center items-center p-6 mx-auto">
      <h2 className="text-2xl font-bold text-center ">Oh no! Looks like something went wrong!</h2>
      <Link href="/dashboard">
        <Button className="mt-5 text-xl bg-green-500/10 border text-green-500 border-green-500 hover:bg-green-500/20">Go back to Dashboard</Button>
      </Link>
    </div>
  )
}