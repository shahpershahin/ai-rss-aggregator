export default function CategoryFilter({ categories, selected, onSelect } : {
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
}) {
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-3 py-1 rounded-full text-sm ${
            selected === cat
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
