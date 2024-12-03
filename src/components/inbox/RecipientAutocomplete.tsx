import { useState, useRef, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { Partner } from '../../data/partnersData';

interface RecipientAutocompleteProps {
  partners: Partner[];
  selectedRecipients: Partner[];
  onSelect: (partner: Partner) => void;
  onRemove: (partnerId: string) => void;
}

export default function RecipientAutocomplete({
  partners,
  selectedRecipients,
  onSelect,
  onRemove
}: RecipientAutocompleteProps) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredPartners = partners.filter(partner => {
    const searchText = `${partner.firstName} ${partner.lastName} ${partner.company}`.toLowerCase();
    const isNotSelected = !selectedRecipients.find(r => r.id === partner.id);
    return searchText.includes(search.toLowerCase()) && isNotSelected;
  });

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-white">
        {selectedRecipients.map(recipient => (
          <span
            key={recipient.id}
            className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-gray-100"
          >
            <span className="max-w-[200px] truncate">
              {recipient.firstName} {recipient.lastName}
            </span>
            <button
              type="button"
              onClick={() => onRemove(recipient.id)}
              className="ml-1 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </span>
        ))}
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={selectedRecipients.length === 0 ? "Search recipients..." : ""}
          className="flex-1 min-w-[200px] border-0 focus:ring-0 p-0 text-sm"
        />
      </div>

      {isOpen && filteredPartners.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200">
          <ul className="py-1">
            {filteredPartners.map(partner => (
              <li
                key={partner.id}
                onClick={() => {
                  onSelect(partner);
                  setSearch('');
                }}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {partner.firstName} {partner.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{partner.company}</p>
                  </div>
                  {selectedRecipients.some(r => r.id === partner.id) && (
                    <Check className="h-4 w-4 text-green-500" />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}