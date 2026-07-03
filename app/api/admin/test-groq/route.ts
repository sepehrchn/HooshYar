import {NextRequest, NextResponse} from 'next/server';
import {getToken} from 'next-auth/jwt';
import Groq from 'groq-sdk';

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        success: false,
        error: 'GROQ_API_KEY is not configured',
      });
    }

    const groq = new Groq({apiKey});

    await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{role: 'user', content: 'ping'}],
      max_tokens: 5,
    });

    return NextResponse.json({success: true});
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Connection test failed';
    console.error('Groq test failed:', error);
    return NextResponse.json({success: false, error: message});
  }
}
