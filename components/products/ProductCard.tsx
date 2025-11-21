import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { formatDate } from '@/lib/utils/date';

interface ProductCardProps {
  product: any;
  onEdit: () => void;
}

export function ProductCard({ product, onEdit }: ProductCardProps) {
  const { deleteProduct, isDeleting } = useProducts();

  const handleDelete = () => {
    if (confirm('이 제품을 삭제하시겠습니까?')) {
      deleteProduct(product.id);
    }
  };

  const isExpiringSoon = () => {
    if (!product.expiry_date) return false;
    const expiryDate = new Date(product.expiry_date);
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry > 0 && daysUntilExpiry <= 30;
  };

  const isExpired = () => {
    if (!product.expiry_date) return false;
    return new Date(product.expiry_date) < new Date();
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <p className="text-sm text-gray-500 mt-1">{product.category}</p>
          </div>
          {isExpired() && (
            <Badge className="bg-error text-white">만료</Badge>
          )}
          {isExpiringSoon() && !isExpired() && (
            <Badge className="bg-warning text-white">
              <AlertCircle className="h-3 w-3 mr-1" />
              곧 만료
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-700">재고</p>
          <p className="text-2xl font-bold">
            {product.stock_quantity} {product.unit}
          </p>
        </div>

        {product.expiry_date && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>유통기한: {formatDate(product.expiry_date, 'short')}</span>
          </div>
        )}

        {product.notes && (
          <p className="text-sm text-gray-600">{product.notes}</p>
        )}

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={onEdit} className="flex-1">
            <Edit className="h-3 w-3 mr-1" />
            수정
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-error hover:text-error"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
