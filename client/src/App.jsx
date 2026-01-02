import { useEffect, useState } from 'react';
import axios from 'axios';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { Users } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null); 

  const fetchContacts = async () => {
    try {
      const res = await axios.get('https://contact-manager-k4ev.onrender.com/api/contacts');
      setContacts(res.data.data);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 flex justify-center items-center gap-3">
            <Users className="text-indigo-600" size={40} />
            Contact Manager
          </h1>
          <p className="text-gray-500">MERN Stack Assessment Task</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ContactForm 
              fetchContacts={fetchContacts} 
              editingContact={editingContact}
              setEditingContact={setEditingContact}
            />
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
              <h2 className="text-xl font-bold text-gray-800 mb-6 pb-4 border-b border-gray-100">
                My Contacts ({contacts.length})
              </h2>
              <ContactList 
                contacts={contacts} 
                fetchContacts={fetchContacts} 
                setEditingContact={setEditingContact}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;