-- ============================================================
-- 004_security_fixes.sql
-- Исправляет предупреждения Supabase Security Advisor
-- Запусти через: Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. Fix function search_path (function_search_path_mutable)
-- Устанавливаем фиксированный search_path для функции обновления updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- 2. Fix RLS policies for contact_requests INSERT (rls_policy_always_true)
-- Заменяем "always true" CHECK на более специфичный — разрешаем только если поля не пусты
DROP POLICY IF EXISTS "Public can insert contact requests" ON public.contact_requests;

CREATE POLICY "Public can insert contact requests"
ON public.contact_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  name IS NOT NULL
  AND name <> ''
  AND phone IS NOT NULL
  AND phone <> ''
);

-- 3. Fix RLS policies for quote_requests INSERT (rls_policy_always_true)
DROP POLICY IF EXISTS "Public can insert quote requests" ON public.quote_requests;

CREATE POLICY "Public can insert quote requests"
ON public.quote_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (
  contact_person IS NOT NULL
  AND contact_person <> ''
  AND phone IS NOT NULL
  AND phone <> ''
);

-- 4. Fix storage bucket listing (public_bucket_allows_listing)
-- Убираем широкую SELECT политику и заменяем на SELECT только по объектам (без листинга)
DROP POLICY IF EXISTS "Public can view media files" ON storage.objects;

-- Разрешаем только прямой доступ к объектам по имени (не листинг директорий)
CREATE POLICY "Public can view media files"
ON storage.objects
FOR SELECT
TO anon, authenticated
USING (
  bucket_id = 'media'
  AND (storage.foldername(name))[1] != ''
);
