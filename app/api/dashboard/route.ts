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

    // Get user's families
    const { data: familyMembers, error: familyError } = await supabase
      .from('family_members')
      .select('family_id')
      .eq('user_id', user.id);

    if (familyError) throw familyError;

    if (!familyMembers || familyMembers.length === 0) {
      return NextResponse.json({
        todaysMedications: [],
        familyMembers: [],
        recentVitals: [],
        healthSummary: {
          avgHealthScore: 0,
          medicationAdherence: 0,
          vitalsCount: 0,
        },
      });
    }

    const familyIds = familyMembers.map((fm: any) => fm.family_id);

    // Get today's medications for family
    const today = new Date().toISOString().split('T')[0];
    const { data: medications } = await supabase
      .from('medication_logs')
      .select(`
        *,
        medication:medications (
          name,
          dosage,
          family_member:family_members (
            health_score,
            relationship,
            user:users (
              full_name
            )
          )
        )
      `)
      .in('medication.family_id', familyIds)
      .gte('scheduled_at', `${today}T00:00:00`)
      .lt('scheduled_at', `${today}T23:59:59`)
      .order('scheduled_at', { ascending: true })
      .limit(10);

    // Get family members with health scores
    const { data: members } = await supabase
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

    // Get recent vitals (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: vitals } = await supabase
      .from('vitals')
      .select(`
        *,
        family_member:family_members (
          user:users (
            full_name
          )
        )
      `)
      .in('family_member_id', members?.map((m: any) => m.id) || [])
      .gte('measured_at', sevenDaysAgo.toISOString())
      .order('measured_at', { ascending: false })
      .limit(20);

    // Calculate health summary
    const avgHealthScore = members?.length
      ? members.reduce((sum: number, m: any) => sum + (m.health_score || 0), 0) / members.length
      : 0;

    const totalMedications = medications?.length || 0;
    const takenMedications = medications?.filter((m: any) => m.status === 'taken').length || 0;
    const medicationAdherence = totalMedications > 0
      ? (takenMedications / totalMedications) * 100
      : 0;

    return NextResponse.json({
      todaysMedications: medications || [],
      familyMembers: members || [],
      recentVitals: vitals || [],
      healthSummary: {
        avgHealthScore: Math.round(avgHealthScore),
        medicationAdherence: Math.round(medicationAdherence),
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
