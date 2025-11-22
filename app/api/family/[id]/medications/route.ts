import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { createAdminClient } = await import('@/lib/supabase/server');
    const adminClient = createAdminClient();

    // Verify that the requested member is in the same family as the current user
    const { data: currentMember, error: currentMemberError } = await adminClient
      .from('family_members')
      .select('family_id')
      .eq('user_id', user.id)
      .single();

    if (currentMemberError || !currentMember) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const { data: targetMember, error: targetMemberError } = await adminClient
      .from('family_members')
      .select('family_id')
      .eq('id', params.id)
      .single();

    if (targetMemberError || !targetMember) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    // Ensure both members are in the same family
    if ((currentMember as any).family_id !== (targetMember as any).family_id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Fetch medications for the requested family member
    const { data: medications, error: medicationsError } = await adminClient
      .from('medications')
      .select('*')
      .eq('member_id', params.id)
      .order('created_at', { ascending: false });

    if (medicationsError) throw medicationsError;

    return NextResponse.json(medications || []);
  } catch (error) {
    console.error('Family member medications API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
