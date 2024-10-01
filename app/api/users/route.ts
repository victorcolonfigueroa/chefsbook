import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const res = NextResponse;
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .throwOnError();

    if (error) {
      return res.json({ error: 'Failed to fetch users' }, { status: 500 });
    }

    return res.json(data);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
    const res = NextResponse;
    const supabase = createClient();
    try {
        const { data, error } = await supabase
            .from('users')
            .insert(request.body)
            .throwOnError();

        if (error) {
            return res.json({ error: 'Failed to create user' }, { status: 500 });
        }

        return res.json(data);
    } catch (error) {
        console.error('Error creating user:', error);
        return res.json({ error: 'Failed to create user' }, { status: 500 });
    }
}