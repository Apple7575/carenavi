import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user's personal medications (active ones)
    const { data: medications } = await supabase
      .from('medications')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(10);

    // Get family members if user is part of a family
    const { createAdminClient } = await import('@/lib/supabase/server');
    const adminClient = createAdminClient();

    const { data: familyMembers } = await adminClient
      .from('family_members')
      .select(`
        *,
        user:users (
          full_name,
          email
        )
      `)
      .eq('user_id', user.id);

    let members: any[] = [];
    if (familyMembers && familyMembers.length > 0) {
      const familyIds = familyMembers.map((fm: any) => fm.family_id);
      const { data: allMembers } = await adminClient
        .from('family_members')
        .select(`
          *,
          user:users (
            full_name,
            email
          )
        `)
        .in('family_id', familyIds)
        .order('health_score', { ascending: true });
      members = allMembers || [];
    }

    // Get recent vitals (last 7 days) - user's personal vitals
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: vitals } = await supabase
      .from('vitals')
      .select('*')
      .eq('user_id', user.id)
      .gte('measured_at', sevenDaysAgo.toISOString())
      .order('measured_at', { ascending: false })
      .limit(20);

    // Calculate health summary
    const avgHealthScore = members?.length
      ? members.reduce((sum: number, m: any) => sum + (m.health_score || 0), 0) / members.length
      : 85; // Default score for individual users

    // For medication adherence, we'll use active medications count
    const medicationAdherence = medications?.length || 0;

    return NextResponse.json({
      todaysMedications: medications || [],
      familyMembers: members || [],
      recentVitals: vitals || [],
      healthSummary: {
        avgHealthScore: Math.round(avgHealthScore),
        medicationAdherence: medicationAdherence > 0 ? 100 : 0,
        vitalsCount: vitals?.length || 0,
      },
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
