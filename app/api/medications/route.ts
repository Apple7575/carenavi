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
    const familyMemberId = searchParams.get('family_member_id');

    let query = supabase
      .from('medications')
      .select(`
        *,
        family_member:family_members (
          id,
          relationship,
          user:users (
            full_name
          )
        )
      `)
      .order('created_at', { ascending: false });

    if (familyMemberId) {
      query = query.eq('family_member_id', familyMemberId);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Medications API error:', error);
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
      .from('medications')
      .insert({
        family_member_id: body.family_member_id,
        name: body.name,
        dosage: body.dosage,
        frequency: body.frequency,
        schedule_times: body.schedule_times,
        start_date: body.start_date,
        end_date: body.end_date,
        instructions: body.instructions,
        is_active: body.is_active ?? true,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Medications POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
