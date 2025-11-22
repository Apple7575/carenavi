'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, TrendingUp, Heart, Shield } from 'lucide-react';

export default function StorePage() {
  const [recommendations, setRecommendations] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getRecommendations = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/store/recommendations');
      if (response.ok) {
        const data = await response.json();
        setRecommendations(data.recommendations || []);
      } else {
        // Fallback to placeholder data if API fails
        setRecommendations([
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
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      // Use placeholder on error
      setRecommendations([
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
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getRecommendations();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-blue-600" />
            AI 스토어
          </h1>
          <p className="text-gray-600 mt-2">
            당신의 건강 데이터를 분석하여 맞춤형 제품을 추천합니다
          </p>
        </div>
      </div>

      {/* AI Analysis Card */}
      <Card className="border-l-4 border-l-blue-500 bg-gradient-to-r from-blue-50 to-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            건강 분석 요약
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Heart className="h-4 w-4 text-red-500" />
            <span className="text-gray-700">평균 혈압: 정상 범위</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-green-500" />
            <span className="text-gray-700">복약 순응도: 양호</span>
          </div>
          <p className="text-sm text-gray-600 mt-4 p-3 bg-blue-100 rounded-lg">
            AI 분석 결과: 전반적인 건강 상태가 양호합니다. 심혈관 건강 유지를 위한 오메가-3와
            면역력 강화를 위한 비타민 D 섭취를 권장합니다.
          </p>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">맞춤 추천 제품</h2>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-4">AI가 분석 중입니다...</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendations.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>{product.category}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>추천 이유:</strong> {product.reason}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-blue-600">{product.price}</span>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      상세보기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Info Card */}
      <Card className="bg-gray-50">
        <CardContent className="pt-6">
          <p className="text-sm text-gray-600 text-center">
            제품 추천은 AI 분석 결과를 기반으로 하며, 실제 구매 전 전문가와 상담하시기 바랍니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
