import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    const { data, error } = await supabase
      .from('medication_logs')
      .update({
        status: body.status,
        taken_at: body.taken_at,
        notes: body.notes,
      })
      .eq('id', body.log_id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error) {
    console.error('Medication log update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
