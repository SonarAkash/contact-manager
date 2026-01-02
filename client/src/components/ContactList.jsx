import { useState } from 'react';
import { Trash2, Mail, Phone, MessageSquare, AlertTriangle, Edit2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ContactList = ({ contacts, fetchContacts, setEditingContact }) => {
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  

  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const toastId = toast.loading('Deleting contact...');
    try {
      await axios.delete(`https://contact-manager-k4ev.onrender.com/api/contacts/${deleteId}`);
      toast.success('Contact deleted', { id: toastId });
      fetchContacts();
    } catch (err) {
      toast.error('Failed to delete', { id: toastId });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  if (contacts.length === 0) return (
    <div className="text-center py-10 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
      <p className="text-gray-500">No contacts yet. Add one to get started!</p>
    </div>
  );

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-fit overflow-y-auto max-h-[800px] pr-2 custom-scrollbar p-1">
        {contacts.map((contact) => (
          <div key={contact._id} className="group relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 duration-300">
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1 min-w-0 pr-2">
                <h3 className="text-xl font-bold text-gray-800 capitalize truncate">{contact.name}</h3>
                <span className="text-xs text-gray-400">{new Date(contact.createdAt).toLocaleDateString()}</span>
              </div>
              
              <div className="flex gap-1 shrink-0">
                
                <button 
                  onClick={() => setEditingContact(contact)}
                  className="p-2 text-gray-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                  title="Edit Contact"
                >
                  <Edit2 size={18} />
                </button>
                
                <button 
                  onClick={() => setDeleteId(contact._id)}
                  className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="Delete Contact"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-indigo-400 shrink-0" />
                <span className="truncate">{contact.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-indigo-400 shrink-0" />
                <span>{contact.phone}</span>
              </div>
              
             
              {contact.message && (
                <div 
                  className="flex items-start gap-3 mt-3 pt-3 border-t border-gray-50 cursor-pointer hover:bg-gray-50 rounded-md transition-colors p-1"
                  onClick={() => toggleExpand(contact._id)}
                  title="Click to expand/collapse"
                >
                  <MessageSquare size={16} className="text-indigo-400 mt-1 shrink-0" />
                  <p className={`italic text-gray-500 break-words ${expandedId === contact._id ? '' : 'line-clamp-2'}`}>
                    {contact.message}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="text-red-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Contact?</h3>
              <p className="text-gray-500 mb-6">Are you sure? This cannot be undone.</p>
              <div className="flex gap-3 w-full">
                <button onClick={() => setDeleteId(null)} className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg">Cancel</button>
                <button onClick={confirmDelete} disabled={isDeleting} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-lg shadow-red-200">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactList;