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

    // Get user's active medications
    const { data: medications } = await supabase
      .from('medications')
      .select('id, schedule_times')
      .eq('user_id', user.id)
      .eq('is_active', true) as { data: Array<{ id: string; schedule_times: string[] }> | null };

    // Create logs for today if they don't exist
    if (medications && medications.length > 0) {
      for (const med of medications) {
        if (med.schedule_times && med.schedule_times.length > 0) {
          for (const time of med.schedule_times) {
            // Check if log already exists
            const { data: existingLog } = await supabase
              .from('medication_logs')
              .select('id')
              .eq('user_id', user.id)
              .eq('medication_id', med.id)
              .eq('scheduled_date', date)
              .eq('scheduled_time', `${time}:00`)
              .single();

            // Create log if it doesn't exist
            if (!existingLog) {
              await supabase
                .from('medication_logs')
                .insert({
                  user_id: user.id,
                  medication_id: med.id,
                  scheduled_date: date,
                  scheduled_time: `${time}:00`,
                  status: 'pending',
                });
            }
          }
        }
      }
    }

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
