import React, {useState} from 'react';

interface TagFilterProps {
    tags: string[];
    selectedTags: string[];
    onTagChange: (selectedTags: string[]) => void;
}

const TagFilter: React.FC<TagFilterProps> = ({tags, selectedTags, onTagChange}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleTagChange = (tag: string) => {
        const updatedTags = selectedTags.includes(tag) ? selectedTags.filter((t) => t !== tag) : [...selectedTags, tag];

        onTagChange(updatedTags);
    };

    const uniqueTags = Array.from(new Set(tags));

    return (
        <div className="tag-filter">
            <button className="tag-filter__toggle" onClick={() => setIsOpen(!isOpen)}>
                Filter by tags
            </button>
            {isOpen && (
                <div className="tag-filter__dropdown show">
                    {uniqueTags.map((tag, i) => (
                        <label key={tag + i} className="tag-filter__label">
                            <input type="checkbox" value={tag} checked={selectedTags.includes(tag)} onChange={() => handleTagChange(tag)} />
                            {tag}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TagFilter;
