import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { createAdminClient } = await import('@/lib/supabase/server');
    const adminClient = createAdminClient();

    // Get the current user's member_id (only show current user's medications)
    const { data: memberData, error: memberError } = await adminClient
      .from('family_members')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (memberError || !memberData) {
      return NextResponse.json({ error: 'Family member not found' }, { status: 404 });
    }

    const query = adminClient
      .from('medications')
      .select(`
        *,
        family_member:family_members!member_id (
          id,
          relationship,
          user:users (
            full_name
          )
        )
      `)
      .eq('member_id', (memberData as any).id)
      .order('created_at', { ascending: false });

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

    const { createAdminClient } = await import('@/lib/supabase/server');
    const adminClient = createAdminClient();

    const body = await request.json();

    // Get family_id from member_id
    const { data: memberData, error: memberError } = await adminClient
      .from('family_members')
      .select('family_id')
      .eq('id', body.member_id)
      .single();

    if (memberError || !memberData) {
      return NextResponse.json({ error: 'Family member not found' }, { status: 404 });
    }

    const { data, error } = await adminClient
      .from('medications')
      .insert({
        family_id: (memberData as any).family_id,
        member_id: body.member_id,
        name: body.name,
        dosage: body.dosage,
        frequency: body.frequency,
        schedule_times: body.schedule_times,
        start_date: body.start_date,
        end_date: body.end_date,
        notes: body.instructions,
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
