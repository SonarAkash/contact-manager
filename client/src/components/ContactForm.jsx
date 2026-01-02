import { useState, useEffect } from 'react';
import { User, Mail, Phone, MessageSquare, Send, Save, X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ContactForm = ({ fetchContacts, editingContact, setEditingContact }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (editingContact) {
      setFormData({
        name: editingContact.name,
        email: editingContact.email,
        phone: editingContact.phone,
        message: editingContact.message || ''
      });
    } else {
      setFormData({ name: '', email: '', phone: '', message: '' });
    }
  }, [editingContact]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, '');
    if (numericValue.length <= 10) {
      setFormData({ ...formData, phone: numericValue });
    }
  };

  const cancelEdit = () => {
    setEditingContact(null);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const validate = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "Invalid email format";
    if (formData.phone.length !== 10) return "Phone number must be exactly 10 digits";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setLoading(true);

    try {
      if (editingContact) {
        await axios.put(`https://contact-manager-k4ev.onrender.com/api/contacts/${editingContact._id}`, formData);
        toast.success('Contact updated successfully!');
        setEditingContact(null); 
      } else {
        await axios.post('https://contact-manager-k4ev.onrender.com/api/contacts', formData);
        toast.success('Contact saved successfully!');
      }
      
      setFormData({ name: '', email: '', phone: '', message: '' });
      fetchContacts();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Operation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`bg-white p-8 rounded-2xl shadow-xl border border-gray-100 sticky top-8 transition-colors ${editingContact ? 'border-indigo-200 bg-indigo-50/30' : ''}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          {editingContact ? <><Save className="text-indigo-600" /> Edit Contact</> : <><User className="text-indigo-600" /> Add New</>}
        </h2>
        {editingContact && (
          <button onClick={cancelEdit} className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-md text-gray-600">
            Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text" placeholder="Full Name" className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="email" placeholder="Email Address" className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="relative">
          <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text" placeholder="Mobile Number (10 digits)" className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            value={formData.phone} onChange={handlePhoneChange}
          />
        </div>
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 text-gray-400" size={18} />
          <textarea
            placeholder="Message (Optional)" rows="3" className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          ></textarea>
        </div>

        <button
          type="submit" disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold flex justify-center items-center gap-2 transition-all shadow-md ${
            loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg'
          }`}
        >
          {loading ? 'Processing...' : (editingContact ? 'Update Contact' : 'Save Contact')}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;