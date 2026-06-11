import { NextRequest, NextResponse } from 'next/server'

// Newsletter signup endpoint.
// To persist emails, add a NewsletterSubscriber model to schema.prisma.
export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }
    // TODO: persist to DB once NewsletterSubscriber model is added to schema
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
