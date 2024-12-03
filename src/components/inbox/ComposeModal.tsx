import { useState } from 'react';
import { X, Paperclip, Send, Plus } from 'lucide-react';
import { partners, Partner } from '../../data/partnersData';
import RecipientAutocomplete from './RecipientAutocomplete';

interface ComposeModalProps {
  onClose: () => void;
}

interface Attachment {
  name: string;
  size: string;
  type: string;
}

export default function ComposeModal({ onClose }: ComposeModalProps) {
  const [selectedRecipients, setSelectedRecipients] = useState<Partner[]>([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleAttachment = () => {
    // Simulate file attachment
    const newAttachment: Attachment = {
      name: `Document-${attachments.length + 1}.pdf`,
      size: '2.4 MB',
      type: 'application/pdf'
    };
    setAttachments([...attachments, newAttachment]);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl mx-4">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Nouveau message</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        {showSuccess ? (
          <div className="p-6 text-center">
            <div className="mb-4 bg-green-50 p-4 rounded-lg">
              <p className="text-green-800">Message sent successfully!</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                À:
              </label>
              <RecipientAutocomplete
                partners={partners}
                selectedRecipients={selectedRecipients}
                onSelect={(partner) => setSelectedRecipients([...selectedRecipients, partner])}
                onRemove={(partnerId) => setSelectedRecipients(selectedRecipients.filter(r => r.id !== partnerId))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Objet:
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                placeholder="Saisissez l'objet"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message:
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={6}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
                placeholder="Tapez votre message ici..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachments:
              </label>
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <Paperclip className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{file.name}</span>
                      <span className="text-sm text-gray-500 ml-2">({file.size})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setAttachments(attachments.filter((_, i) => i !== index));
                      }}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAttachment}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une pièce jointe
                </button>
              </div>
            </div>

            <div className="pt-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800"
              >
                <div className="flex items-center">
                  <Send className="h-4 w-4 mr-2" />
                  Envoyer le message
                </div>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}