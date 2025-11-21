'use client';

import * as React from 'react';
import { Plus, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useProducts } from '@/hooks/useProducts';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { EmptyState } from '@/components/shared/EmptyState';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductDialog } from '@/components/products/ProductDialog';

export default function ProductsPage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<any>(null);
  const { data: products, isLoading, error } = useProducts();

  const handleEdit = (product: any) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="lg" text="제품 정보를 불러오는 중..." />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="max-w-md mx-auto mt-8 p-6">
        <EmptyState
          icon={Package}
          title="데이터를 불러올 수 없습니다"
          description="잠시 후 다시 시도해 주세요"
        />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">제품 관리</h1>
          <p className="text-gray-500 mt-1">의료용품 및 생필품의 재고를 관리하세요</p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          제품 추가
        </Button>
      </div>

      {!products || products.length === 0 ? (
        <Card className="p-12">
          <EmptyState
            icon={Package}
            title="등록된 제품이 없습니다"
            description="제품을 추가하여 재고를 관리하세요"
            actionLabel="제품 추가하기"
            onAction={() => setIsDialogOpen(true)}
          />
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => handleEdit(product)}
            />
          ))}
        </div>
      )}

      <ProductDialog
        open={isDialogOpen}
        onOpenChange={handleClose}
        product={selectedProduct}
      />
    </div>
  );
}
