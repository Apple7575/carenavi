'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatDate } from '@/lib/utils/date';

interface VitalsChartProps {
  vitals: any[];
}

export function VitalsChart({ vitals }: VitalsChartProps) {
  const chartData = React.useMemo(() => {
    const groupedByDate: Record<string, any> = {};

    vitals.forEach((vital) => {
      const date = formatDate(vital.measured_at, 'short');

      if (!groupedByDate[date]) {
        groupedByDate[date] = { date };
      }

      if (vital.type === 'blood_pressure') {
        const [systolic, diastolic] = vital.value.split('/').map(Number);
        groupedByDate[date].systolic = systolic;
        groupedByDate[date].diastolic = diastolic;
      } else if (vital.type === 'blood_sugar') {
        groupedByDate[date].blood_sugar = parseInt(vital.value);
      } else if (vital.type === 'weight') {
        groupedByDate[date].weight = parseFloat(vital.value);
      } else if (vital.type === 'heart_rate') {
        groupedByDate[date].heart_rate = parseInt(vital.value);
      }
    });

    return Object.values(groupedByDate).reverse().slice(0, 14);
  }, [vitals]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>건강 지표 추이</CardTitle>
        <CardDescription>최근 14일간의 변화</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="date" stroke="#6B7280" fontSize={12} tickLine={false} />
            <YAxis stroke="#6B7280" fontSize={12} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '14px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '12px' }} />
            {chartData.some(d => d.systolic) && (
              <Line
                type="monotone"
                dataKey="systolic"
                stroke="#3B82F6"
                strokeWidth={2}
                name="수축기 혈압"
                dot={{ fill: '#3B82F6' }}
              />
            )}
            {chartData.some(d => d.diastolic) && (
              <Line
                type="monotone"
                dataKey="diastolic"
                stroke="#60A5FA"
                strokeWidth={2}
                name="이완기 혈압"
                dot={{ fill: '#60A5FA' }}
              />
            )}
            {chartData.some(d => d.blood_sugar) && (
              <Line
                type="monotone"
                dataKey="blood_sugar"
                stroke="#10B981"
                strokeWidth={2}
                name="혈당"
                dot={{ fill: '#10B981' }}
              />
            )}
            {chartData.some(d => d.heart_rate) && (
              <Line
                type="monotone"
                dataKey="heart_rate"
                stroke="#F59E0B"
                strokeWidth={2}
                name="심박수"
                dot={{ fill: '#F59E0B' }}
              />
            )}
            {chartData.some(d => d.weight) && (
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#EF4444"
                strokeWidth={2}
                name="체중"
                dot={{ fill: '#EF4444' }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
