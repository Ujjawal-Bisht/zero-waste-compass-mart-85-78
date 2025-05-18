
-- Create two_factor_auth table
CREATE TABLE IF NOT EXISTS public.two_factor_auth (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  secret TEXT NOT NULL,
  is_enabled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.two_factor_auth ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own 2FA settings"
  ON public.two_factor_auth
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own 2FA settings"
  ON public.two_factor_auth
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_two_factor_auth_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_two_factor_auth_updated_at
  BEFORE UPDATE ON public.two_factor_auth
  FOR EACH ROW EXECUTE FUNCTION update_two_factor_auth_updated_at();

-- Fix types.d.ts issues
CREATE TYPE public.order_status AS ENUM (
  'pending',
  'processing',
  'shipped',
  'out-for-delivery',
  'delivered',
  'cancelled'
);

-- Fix product_utils issues
CREATE TYPE public.item_status AS ENUM (
  'available',
  'sold',
  'expired',
  'donated',
  'flagged',
  'reserved'
);
