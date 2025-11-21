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
    const { invite_code, relationship } = body;

    // Find family by invite code
    const { data: family, error: familyError } = await supabase
      .from('families')
      .select('*')
      .eq('invite_code', invite_code)
      .single();

    if (familyError || !family) {
      return NextResponse.json({ error: 'Invalid invite code' }, { status: 404 });
    }

    // Check if user is already a member
    const { data: existingMember } = await supabase
      .from('family_members')
      .select('id')
      .eq('family_id', (family as any).id)
      .eq('user_id', user.id)
      .single();

    if (existingMember) {
      return NextResponse.json({ error: 'Already a member' }, { status: 400 });
    }

    // Add user as family member
    const { data: member, error: memberError } = await supabase
      .from('family_members')
      .insert({
        family_id: (family as any).id,
        user_id: user.id,
        nickname: user.email?.split('@')[0] || 'User',
        relationship: relationship || 'other',
        health_score: 100,
        status: 'good',
      } as any)
      .select()
      .single();

    if (memberError) throw memberError;

    return NextResponse.json({ family, member }, { status: 201 });
  } catch (error) {
    console.error('Family invite error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
