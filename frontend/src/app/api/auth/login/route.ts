import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const DEMO_USERNAME = process.env.DEMO_AUTH_USERNAME;
    const DEMO_PASSWORD = process.env.DEMO_AUTH_PASSWORD;
    if (!DEMO_USERNAME || !DEMO_PASSWORD) {
      return NextResponse.json({ error: 'Demo credentials not configured' }, { status: 500 });
    }
    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      const response = NextResponse.json({ success: true });
      response.cookies.set('demo-auth', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      return response;
    }
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (e) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
