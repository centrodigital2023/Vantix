-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create accommodations table
CREATE TABLE IF NOT EXISTS accommodations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  city TEXT NOT NULL,
  department TEXT NOT NULL,
  address TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  images TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}',
  rating DECIMAL(2,1) DEFAULT 0.0,
  reviews_count INTEGER DEFAULT 0,
  base_price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'COP',
  status TEXT DEFAULT 'pending' CHECK (status IN ('active', 'inactive', 'pending'))
);

-- Create room_types table
CREATE TABLE IF NOT EXISTS room_types (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  accommodation_id UUID REFERENCES accommodations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  max_guests INTEGER NOT NULL,
  price_per_night DECIMAL(10,2) NOT NULL,
  available_rooms INTEGER DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  amenities TEXT[] DEFAULT '{}'
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  accommodation_id UUID REFERENCES accommodations(id) ON DELETE CASCADE,
  room_type_id UUID REFERENCES room_types(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  guests_count INTEGER NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'COP',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  payment_id TEXT,
  special_requests TEXT
);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  category_scores JSONB DEFAULT '{}',
  viewed_accommodations TEXT[] DEFAULT '{}',
  clicked_accommodations TEXT[] DEFAULT '{}',
  booked_accommodations TEXT[] DEFAULT '{}',
  search_history TEXT[] DEFAULT '{}',
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Create pricing_data table
CREATE TABLE IF NOT EXISTS pricing_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  city TEXT NOT NULL,
  department TEXT NOT NULL,
  category TEXT NOT NULL,
  season TEXT NOT NULL CHECK (season IN ('high', 'low')),
  budget_min DECIMAL(10,2) NOT NULL,
  budget_max DECIMAL(10,2) NOT NULL,
  mid_range_min DECIMAL(10,2) NOT NULL,
  mid_range_max DECIMAL(10,2) NOT NULL,
  premium_min DECIMAL(10,2) NOT NULL,
  premium_max DECIMAL(10,2) NOT NULL,
  luxury_min DECIMAL(10,2) NOT NULL,
  luxury_max DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'COP',
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(city, category, season)
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  featured_image TEXT,
  author TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  generated_by_ai BOOLEAN DEFAULT false
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_accommodations_owner ON accommodations(owner_id);
CREATE INDEX IF NOT EXISTS idx_accommodations_category ON accommodations(category);
CREATE INDEX IF NOT EXISTS idx_accommodations_city ON accommodations(city);
CREATE INDEX IF NOT EXISTS idx_accommodations_status ON accommodations(status);

CREATE INDEX IF NOT EXISTS idx_room_types_accommodation ON room_types(accommodation_id);

CREATE INDEX IF NOT EXISTS idx_bookings_accommodation ON bookings(accommodation_id);
CREATE INDEX IF NOT EXISTS idx_bookings_room_type ON bookings(room_type_id);
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

CREATE INDEX IF NOT EXISTS idx_user_preferences_user ON user_preferences(user_id);

CREATE INDEX IF NOT EXISTS idx_pricing_city_category ON pricing_data(city, category);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at columns
CREATE TRIGGER update_accommodations_updated_at
  BEFORE UPDATE ON accommodations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE accommodations ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies for accommodations
CREATE POLICY "Public accommodations are viewable by everyone"
  ON accommodations FOR SELECT
  USING (status = 'active');

CREATE POLICY "Owners can view their own accommodations"
  ON accommodations FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Owners can insert their own accommodations"
  ON accommodations FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update their own accommodations"
  ON accommodations FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Owners can delete their own accommodations"
  ON accommodations FOR DELETE
  USING (auth.uid() = owner_id);

-- RLS Policies for room_types
CREATE POLICY "Room types are viewable by everyone"
  ON room_types FOR SELECT
  USING (true);

CREATE POLICY "Owners can manage room types for their accommodations"
  ON room_types FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM accommodations
      WHERE accommodations.id = room_types.accommodation_id
      AND accommodations.owner_id = auth.uid()
    )
  );

-- RLS Policies for bookings
CREATE POLICY "Users can view their own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Owners can view bookings for their accommodations"
  ON bookings FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM accommodations
      WHERE accommodations.id = bookings.accommodation_id
      AND accommodations.owner_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can create bookings"
  ON bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update their own bookings"
  ON bookings FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for user_preferences
CREATE POLICY "Users can view their own preferences"
  ON user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences"
  ON user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
  ON user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for pricing_data
CREATE POLICY "Pricing data is viewable by everyone"
  ON pricing_data FOR SELECT
  USING (true);

CREATE POLICY "Only admins can manage pricing data"
  ON pricing_data FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- RLS Policies for blog_posts
CREATE POLICY "Published blog posts are viewable by everyone"
  ON blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can view all blog posts"
  ON blog_posts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Admins can manage blog posts"
  ON blog_posts FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );
