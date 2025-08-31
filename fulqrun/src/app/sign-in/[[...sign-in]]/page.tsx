import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground">FulQrun</h1>
          <p className="text-muted-foreground">Sales Operations Platform</p>
        </div>
        <SignIn />
      </div>
    </div>
  )
}