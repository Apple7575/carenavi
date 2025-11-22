import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  console.log('[Vitals API] GET request received');
  try {
    const supabase = createClient();
    console.log('[Vitals API] Supabase client created');
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    console.log('[Vitals API] User auth check:', { user: user?.id, authError });

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const days = parseInt(searchParams.get('days') || '30');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Query vitals directly by user_id (no need for family_members)
    let query = supabase
      .from('vitals')
      .select('*')
      .eq('user_id', user.id)
      .gte('measured_at', startDate.toISOString())
      .order('measured_at', { ascending: false });

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

    const body = await request.json();

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

    const { data, error } = await supabase
      .from('vitals')
      .insert({
        user_id: user.id,
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
