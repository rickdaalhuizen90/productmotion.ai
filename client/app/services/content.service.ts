import { readFile, readdir } from 'fs/promises';
import { join } from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { tailwindRenderer } from '~/utils/markdown-renderer';

const CONTENT_DIR = join(process.cwd(), 'content');

export interface ContentMeta {
  title: string;
  date: string;
  slug: string;
  excerpt?: string;
  tags?: string[];
}

export async function getContentList(type: 'case-studies' | 'blog'): Promise<ContentMeta[]> {
  const dir = join(CONTENT_DIR, type);
  const files = await readdir(dir);
  
  const contents = await Promise.all(
    files.map(async (file) => {
      const content = await readFile(join(dir, file), 'utf-8');
      const { data } = matter(content);
      return data as ContentMeta;
    })
  );
  
  return contents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getContent(type: 'case-studies' | 'blog', slug: string) {
  try {
    const filePath = join(CONTENT_DIR, type, `${slug}.mdx`);
    const content = await readFile(filePath, 'utf-8');
    const { data, content: markdownContent } = matter(content);
    
    return {
      ...data,
      content: marked.parse(markdownContent, { 
        renderer: tailwindRenderer,
        breaks: true
      }),
      slug
    };
  } catch (error) {
    return null;
  }
}
