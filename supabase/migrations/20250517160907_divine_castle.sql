/*
  # Digital Library Schema

  1. New Tables
    - `books`
      - `id` (uuid, primary key)
      - `title` (text)
      - `author` (text)
      - `cover_url` (text)
      - `categories` (text[])
      - `format` (text)
      - `downloads` (int)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `created_by` (uuid, references auth.users)

    - `audio_files`
      - `id` (uuid, primary key)
      - `title` (text)
      - `speaker` (text)
      - `thumbnail_url` (text)
      - `file_url` (text)
      - `duration` (text)
      - `categories` (text[])
      - `format` (text)
      - `listens` (int)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `created_by` (uuid, references auth.users)

    - `videos`
      - `id` (uuid, primary key)
      - `title` (text)
      - `creator` (text)
      - `thumbnail_url` (text)
      - `file_url` (text)
      - `duration` (text)
      - `categories` (text[])
      - `resolutions` (text[])
      - `views` (int)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `created_by` (uuid, references auth.users)

  2. Security
    - Enable RLS on all tables
    - Add policies for CRUD operations based on user role
*/

-- Create books table
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL,
  cover_url text,
  categories text[] DEFAULT '{}',
  format text NOT NULL,
  downloads int DEFAULT 0,
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Create audio_files table
CREATE TABLE IF NOT EXISTS audio_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  speaker text NOT NULL,
  thumbnail_url text,
  file_url text,
  duration text NOT NULL,
  categories text[] DEFAULT '{}',
  format text NOT NULL,
  listens int DEFAULT 0,
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  creator text NOT NULL,
  thumbnail_url text,
  file_url text,
  duration text NOT NULL,
  categories text[] DEFAULT '{}',
  resolutions text[] DEFAULT '{}',
  views int DEFAULT 0,
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  created_by uuid REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE audio_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Create policies for books
CREATE POLICY "Anyone can view published books"
  ON books
  FOR SELECT
  USING (status = 'published' OR status = 'featured');

CREATE POLICY "Users can manage their own books"
  ON books
  USING (auth.uid() = created_by);

-- Create policies for audio_files
CREATE POLICY "Anyone can view published audio files"
  ON audio_files
  FOR SELECT
  USING (status = 'published' OR status = 'featured');

CREATE POLICY "Users can manage their own audio files"
  ON audio_files
  USING (auth.uid() = created_by);

-- Create policies for videos
CREATE POLICY "Anyone can view published videos"
  ON videos
  FOR SELECT
  USING (status = 'published' OR status = 'featured');

CREATE POLICY "Users can manage their own videos"
  ON videos
  USING (auth.uid() = created_by);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_books_updated_at
  BEFORE UPDATE ON books
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_audio_files_updated_at
  BEFORE UPDATE ON audio_files
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at
  BEFORE UPDATE ON videos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();