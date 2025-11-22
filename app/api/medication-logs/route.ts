import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

    // Get today's medication logs
    const { data: logs, error } = await supabase
      .from('medication_logs')
      .select(`
        *,
        medication:medications (
          id,
          name,
          dosage,
          frequency,
          notes
        )
      `)
      .eq('user_id', user.id)
      .eq('scheduled_date', date)
      .order('scheduled_time', { ascending: true });

    if (error) throw error;

    return NextResponse.json(logs || []);
  } catch (error) {
    console.error('Medication logs GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

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
