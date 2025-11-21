import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Generate a random invite code
function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Removed ambiguous characters
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's families
    const { data: familyMembers } = await supabase
      .from('family_members')
      .select('family_id')
      .eq('user_id', user.id);

    if (!familyMembers || familyMembers.length === 0) {
      return NextResponse.json([]);
    }

    const familyIds = familyMembers.map((fm: any) => fm.family_id);

    // Get all family members in these families
    const { data: members, error } = await supabase
      .from('family_members')
      .select(`
        *,
        family:families (
          id,
          name,
          invite_code
        ),
        user:users (
          full_name,
          email
        )
      `)
      .in('family_id', familyIds)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return NextResponse.json(members || []);
  } catch (error) {
    console.error('Family API error:', error);
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

    console.log('POST /api/family - User:', { id: user.id, email: user.email });

    const body = await request.json();

    // Generate unique invite code
    const inviteCode = generateInviteCode();

    console.log('Attempting to insert family:', { name: body.name, created_by: user.id, invite_code: inviteCode });

    // Create family - DISABLE RLS check temporarily to test
    const { data: family, error: familyError } = await supabase
      .from('families')
      .insert({
        name: body.name,
        created_by: user.id,
        invite_code: inviteCode,
      })
      .select()
      .single();

    console.log('Family creation result:', { family, error: familyError });

    if (familyError) throw familyError;

    // Add creator as family member
    const { data: member, error: memberError } = await supabase
      .from('family_members')
      .insert({
        family_id: (family as any).id,
        user_id: user.id,
        nickname: user.email?.split('@')[0] || 'Me',
        relationship: 'self',
        health_score: 100,
        status: 'good',
      } as any)
      .select()
      .single();

    if (memberError) throw memberError;

    return NextResponse.json({ family, member }, { status: 201 });
  } catch (error) {
    console.error('Family POST error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
