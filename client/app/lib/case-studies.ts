import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

const caseStudiesPath = path.join(process.cwd(), 'content/case-studies');

interface CaseStudy {
  slug: string;
  title: string;
  content: string;
  date: string;
}

export function getCaseStudy(slug: string): CaseStudy | null {
  try {
    const filePath = path.join(caseStudiesPath, `${slug}.md`);
    const source = fs.readFileSync(filePath, 'utf8');
    const { content, data } = matter(source);
    
    return {
      slug,
      content: marked(content),
      title: data.title,
      date: data.date,
    };
  } catch (error) {
    return null;
  }
}

export async function getAllCaseStudies() {
  const files = await fs.promises.readdir(caseStudiesPath);
  const studies = await Promise.all(
    files.map((file) => getCaseStudy(file.replace('.md', '')))
  );
  return studies.filter(Boolean) as CaseStudy[];
}
