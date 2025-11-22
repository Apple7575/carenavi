import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { createAdminClient } = await import('@/lib/supabase/server');
    const adminClient = createAdminClient();

    const { searchParams } = new URL(request.url);
    const familyMemberId = searchParams.get('family_member_id');
    const type = searchParams.get('type');
    const days = parseInt(searchParams.get('days') || '30');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    let query = adminClient
      .from('vitals')
      .select(`
        *,
        family_member:family_members!member_id (
          id,
          nickname,
          relationship
        )
      `)
      .gte('measured_at', startDate.toISOString())
      .order('measured_at', { ascending: false });

    if (familyMemberId) {
      query = query.eq('member_id', familyMemberId);
    }

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Vitals API error:', error);
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

    // Get family_id from the user's family membership
    const { data: memberData, error: memberError } = await adminClient
      .from('family_members')
      .select('family_id, id')
      .eq('user_id', user.id)
      .single();

    if (memberError || !memberData) {
      return NextResponse.json({ error: 'Family member not found' }, { status: 404 });
    }

    // Determine unit based on type
    let unit = '';
    switch (body.type) {
      case 'blood_pressure':
        unit = 'mmHg';
        break;
      case 'blood_sugar':
        unit = 'mg/dL';
        break;
      case 'weight':
        unit = 'kg';
        break;
      case 'heart_rate':
        unit = 'bpm';
        break;
      default:
        unit = '';
    }

    const { data, error } = await adminClient
      .from('vitals')
      .insert({
        family_id: (memberData as any).family_id,
        member_id: body.family_member_id || (memberData as any).id,
        type: body.type,
        value: body.value,
        unit: unit,
        measured_at: body.measured_at || new Date().toISOString(),
        notes: body.notes || '',
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Vitals POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
