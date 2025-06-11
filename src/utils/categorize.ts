export function categorizeBlog(title: string): string {
  const keywords: Record<string, string[]> = {
    Technology: ['tech', 'AI', 'software', 'startup'],
    Science: ['science', 'research', 'experiment'],
    Finance: ['finance', 'market', 'stocks'],
    Health: ['health', 'medicine', 'wellness']
  };

  for (const [cat, words] of Object.entries(keywords)) {
    if (words.some(w => title.toLowerCase().includes(w))) {
      return cat;
    }
  }
  return 'General';
}
