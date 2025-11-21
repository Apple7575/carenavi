-- Create products table
-- Health store products

CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  image_url TEXT,
  external_link TEXT NOT NULL,
  rating DECIMAL(2, 1) CHECK (rating >= 0 AND rating <= 5),
  tags JSONB DEFAULT '[]',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT products_category_check CHECK (category IN ('supplement', 'device', 'service'))
);

-- Create indexes
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_active ON public.products(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_products_tags ON public.products USING GIN (tags);

-- Add comment
COMMENT ON TABLE public.products IS 'Health store product catalog';
