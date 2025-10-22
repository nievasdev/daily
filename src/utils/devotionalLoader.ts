import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

marked.setOptions({breaks:false,gfm:true});

export interface Devotional {
  day: number;
  month: number;
  year: number;
  title: string;
  content: string;
  date: string;
}

const DEVOTIONALS_DIR = path.join(process.cwd(), 'src/data/devotionals');

function parseFilename(filename: string): { day: number; month: number; year: number } | null {
  const match = filename.match(/^(\d{1,2})-(\d{1,2})-(\d{4})\.md$/);
  if (!match) return null;

  const [, day, month, year] = match;
  return {
    day: parseInt(day, 10),
    month: parseInt(month, 10),
    year: parseInt(year, 10),
  };
}

export async function loadDevotional(filename: string): Promise<Devotional | null> {
  const parsed = parseFilename(filename);
  if (!parsed) return null;

  const filePath = path.join(DEVOTIONALS_DIR, filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  const match = fileContent.match(/^---\s*\ntitle:\s*(.+?)\s*\n---\s*\n(.+)$/s);
  const title = match?.[1]?.trim() || `Devotional ${parsed.day}/${parsed.month}/${parsed.year}`;
  const content = match?.[2] || fileContent;

  const htmlContent = await marked(content);

  return {
    day: parsed.day,
    month: parsed.month,
    year: parsed.year,
    title,
    content: htmlContent,
    date: `${parsed.year}-${String(parsed.month).padStart(2, '0')}-${String(parsed.day).padStart(2, '0')}`,
  };
}

export async function loadAllDevotionals(): Promise<Devotional[]> {
  if (!fs.existsSync(DEVOTIONALS_DIR)) {
    return [];
  }

  const files = fs.readdirSync(DEVOTIONALS_DIR).filter(file => file.endsWith('.md'));
  const devotionals: Devotional[] = [];

  for (const file of files) {
    const devotional = await loadDevotional(file);
    if (devotional) {
      devotionals.push(devotional);
    }
  }

  devotionals.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return devotionals;
}

export async function getDevotionalsForDayMonth(day: number, month: number): Promise<Devotional[]> {
  const allDevotionals = await loadAllDevotionals();
  return allDevotionals
    .filter(d => d.day === day && d.month === month)
    .sort((a, b) => b.year - a.year);
}

export async function getAllDayMonthCombinations(): Promise<Array<{ day: number; month: number }>> {
  const allDevotionals = await loadAllDevotionals();
  const combinations = new Set<string>();

  allDevotionals.forEach(d => {
    combinations.add(`${d.day}-${d.month}`);
  });

  return Array.from(combinations).map(combo => {
    const [day, month] = combo.split('-').map(Number);
    return { day, month };
  });
}
