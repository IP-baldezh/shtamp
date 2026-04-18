-- ============================================================
-- Supabase Storage: bucket "media" для загрузки изображений
-- Запусти этот скрипт в Supabase Dashboard → SQL Editor
-- ============================================================

-- Создание публичного бакета
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  10485760, -- 10 MB лимит на файл
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO UPDATE
  SET public = true,
      file_size_limit = 10485760,
      allowed_mime_types = ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

-- RLS: публичный просмотр файлов
CREATE POLICY "Public can view media files" ON storage.objects
  FOR SELECT USING (bucket_id = 'media');

-- RLS: аутентифицированные пользователи могут загружать
CREATE POLICY "Authenticated users can upload media" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'media'
    AND auth.role() = 'authenticated'
  );

-- RLS: аутентифицированные пользователи могут обновлять свои файлы
CREATE POLICY "Authenticated users can update media" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'media'
    AND auth.role() = 'authenticated'
  );

-- RLS: аутентифицированные пользователи могут удалять файлы
CREATE POLICY "Authenticated users can delete media" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'media'
    AND auth.role() = 'authenticated'
  );
