-- Create enum types
CREATE TYPE service_category AS ENUM ('stamps', 'molds', 'design', 'repair');
CREATE TYPE industry_type AS ENUM ('automotive', 'aerospace', 'electronics', 'appliances', 'construction', 'medical', 'energy', 'defense');
CREATE TYPE case_status AS ENUM ('draft', 'published');
CREATE TYPE article_status AS ENUM ('draft', 'published');

-- Cases table (Portfolio/Projects)
CREATE TABLE IF NOT EXISTS cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  client TEXT,
  industry industry_type,
  services service_category[],
  challenge TEXT,
  solution TEXT,
  results TEXT,
  image_url TEXT,
  gallery TEXT[],
  status case_status DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Articles table (Blog/News)
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  category TEXT,
  author TEXT DEFAULT 'Редакция',
  status article_status DEFAULT 'draft',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Equipment table
CREATE TABLE IF NOT EXISTS equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  specifications JSONB,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact requests (form submissions)
CREATE TABLE IF NOT EXISTS contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  company TEXT,
  message TEXT,
  request_type TEXT DEFAULT 'callback',
  is_urgent BOOLEAN DEFAULT false,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Quote requests (detailed form submissions)
CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  contact_person TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  product_type TEXT,
  material TEXT,
  quantity TEXT,
  deadline TEXT,
  has_drawings BOOLEAN DEFAULT false,
  additional_info TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site settings (key-value store for site configuration)
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for public read access
CREATE POLICY "Public can read published cases" ON cases
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can read published articles" ON articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can read active equipment" ON equipment
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can read site settings" ON site_settings
  FOR SELECT USING (true);

-- RLS Policies for public insert (contact forms)
CREATE POLICY "Public can insert contact requests" ON contact_requests
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can insert quote requests" ON quote_requests
  FOR INSERT WITH CHECK (true);

-- RLS Policies for authenticated users (admin)
CREATE POLICY "Authenticated users can manage cases" ON cases
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage articles" ON articles
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage equipment" ON equipment
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage contact requests" ON contact_requests
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage quote requests" ON quote_requests
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage site settings" ON site_settings
  FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status);
CREATE INDEX IF NOT EXISTS idx_cases_industry ON cases(industry);
CREATE INDEX IF NOT EXISTS idx_cases_featured ON cases(featured);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at);
CREATE INDEX IF NOT EXISTS idx_equipment_category ON equipment(category);
CREATE INDEX IF NOT EXISTS idx_contact_requests_is_read ON contact_requests(is_read);
CREATE INDEX IF NOT EXISTS idx_quote_requests_is_read ON quote_requests(is_read);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_cases_updated_at BEFORE UPDATE ON cases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_equipment_updated_at BEFORE UPDATE ON equipment
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
