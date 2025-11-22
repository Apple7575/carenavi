import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import OpenAI from 'openai';

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.warn('OpenAI API key not configured, returning placeholder recommendations');
      return NextResponse.json({
        recommendations: [
          {
            id: 1,
            name: '오메가-3 피쉬오일',
            category: '영양제',
            reason: '심혈관 건강 개선에 도움',
            price: '29,900원',
            image: 'https://source.unsplash.com/400x400/?omega-3,fish-oil',
          },
          {
            id: 2,
            name: '비타민 D3',
            category: '영양제',
            reason: '골다공증 예방 및 면역력 강화',
            price: '19,900원',
            image: 'https://source.unsplash.com/400x400/?vitamin,supplement',
          },
          {
            id: 3,
            name: '유산균 프로바이오틱스',
            category: '영양제',
            reason: '장 건강 개선',
            price: '34,900원',
            image: 'https://source.unsplash.com/400x400/?probiotics,health',
          },
        ],
      });
    }

    const { createAdminClient } = await import('@/lib/supabase/server');
    const adminClient = createAdminClient();

    // Get user's family member data
    const { data: memberData, error: memberError } = await adminClient
      .from('family_members')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (memberError || !memberData) {
      return NextResponse.json({ error: 'Family member not found' }, { status: 404 });
    }

    // Fetch user's recent vitals
    const { data: vitals } = await adminClient
      .from('vitals')
      .select('*')
      .eq('member_id', (memberData as any).id)
      .order('measured_at', { ascending: false })
      .limit(10);

    // Fetch user's medications
    const { data: medications } = await adminClient
      .from('medications')
      .select('*')
      .eq('member_id', (memberData as any).id)
      .eq('is_active', true);

    // Initialize OpenAI with GPT-4o mini
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Prepare health data summary for AI
    const healthSummary = {
      vitals: vitals || [],
      medications: medications || [],
    };

    const prompt = `당신은 건강 관리 전문가입니다. 다음 사용자의 건강 데이터를 분석하고, 맞춤형 건강 보조제나 제품을 3개 추천해주세요.

건강 데이터:
- 최근 건강 지표: ${JSON.stringify(vitals?.slice(0, 5) || [])}
- 현재 복용중인 약: ${JSON.stringify(medications || [])}

다음 JSON 형식으로 정확히 3개의 제품을 추천해주세요:
[
  {
    "name": "제품명",
    "category": "카테고리 (예: 영양제, 건강기능식품 등)",
    "reason": "추천 이유 (한 문장으로 간단하게)",
    "price": "예상 가격대 (예: 29,900원)",
    "imageQuery": "제품 이미지 검색어 (영문)"
  }
]

추천 시 고려사항:
1. 사용자의 건강 상태에 실제로 도움이 될 수 있는 제품
2. 현재 복용 중인 약과 상호작용이 없는 제품
3. 일반적으로 안전하고 검증된 제품
4. 한국에서 구매 가능한 제품`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: '당신은 건강 관리 전문가로서, 사용자의 건강 데이터를 분석하여 맞춤형 제품을 추천합니다. 항상 JSON 형식으로만 응답하세요.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const aiResponse = completion.choices[0]?.message?.content || '[]';

    // Parse AI response
    let recommendations;
    try {
      recommendations = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      // Fallback to default recommendations
      recommendations = [
        {
          name: '오메가-3 피쉬오일',
          category: '영양제',
          reason: '심혈관 건강 개선에 도움',
          price: '29,900원',
          imageQuery: 'omega-3,fish-oil',
        },
        {
          name: '비타민 D3',
          category: '영양제',
          reason: '골다공증 예방 및 면역력 강화',
          price: '19,900원',
          imageQuery: 'vitamin,supplement',
        },
        {
          name: '유산균 프로바이오틱스',
          category: '영양제',
          reason: '장 건강 개선',
          price: '34,900원',
          imageQuery: 'probiotics,health',
        },
      ];
    }

    // Add image URLs and IDs
    const recommendationsWithImages = recommendations.map((rec: any, index: number) => ({
      id: index + 1,
      ...rec,
      image: `https://source.unsplash.com/400x400/?${rec.imageQuery || 'health,supplement'}`,
    }));

    return NextResponse.json({ recommendations: recommendationsWithImages });
  } catch (error) {
    console.error('Store recommendations API error:', error);

    // Return fallback recommendations on error
    return NextResponse.json({
      recommendations: [
        {
          id: 1,
          name: '오메가-3 피쉬오일',
          category: '영양제',
          reason: '심혈관 건강 개선에 도움',
          price: '29,900원',
          image: 'https://source.unsplash.com/400x400/?omega-3,fish-oil',
        },
        {
          id: 2,
          name: '비타민 D3',
          category: '영양제',
          reason: '골다공증 예방 및 면역력 강화',
          price: '19,900원',
          image: 'https://source.unsplash.com/400x400/?vitamin,supplement',
        },
        {
          id: 3,
          name: '유산균 프로바이오틱스',
          category: '영양제',
          reason: '장 건강 개선',
          price: '34,900원',
          image: 'https://source.unsplash.com/400x400/?probiotics,health',
        },
      ],
    });
  }
}
