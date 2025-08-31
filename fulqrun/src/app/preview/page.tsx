import { redirect } from 'next/navigation'

export default function PreviewPage() {
  // Redirect to demo page for public preview
  redirect('/demo')
}