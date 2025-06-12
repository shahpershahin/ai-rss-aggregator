type Props = {
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
};

export default function CategoryFilter({ categories, selected, onSelect }: Props) {
  return (
    <div className="flex gap-2 flex-wrap mb-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-2 rounded-full border ${
            selected === cat ? 'bg-blue-600 text-white' : 'bg-white text-blue-600'
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
