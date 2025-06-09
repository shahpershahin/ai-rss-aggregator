export const categorizeBlog = (title: string): string => {
  const categories: Record<string, string[]> = {
    Technology: ['tech', 'AI', 'software', 'startup'],
    Science: ['research', 'science', 'experiment'],
    Finance: ['finance', 'market', 'stocks'],
    Health: ['health', 'wellness', 'medicine'],
  };

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some((kw) => title.toLowerCase().includes(kw.toLowerCase()))) {
      return category;
    }
  }

  return 'General';
};
