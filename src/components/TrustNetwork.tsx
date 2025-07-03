import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, UserPlus, Phone, Mail, Shield, Trash2 } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  relationship: string;
  priority: 'high' | 'medium' | 'low';
}

export function TrustNetwork() {
  const [contacts, setContacts] = useState<Contact[]>([
    { id: 1, name: 'Mom', phone: '+1-555-0123', email: 'mom@email.com', relationship: 'Family', priority: 'high' },
    { id: 2, name: 'Sarah (Best Friend)', phone: '+1-555-0456', email: 'sarah@email.com', relationship: 'Friend', priority: 'high' },
    { id: 3, name: 'Dr. Smith', phone: '+1-555-0789', email: 'dr.smith@clinic.com', relationship: 'Doctor', priority: 'medium' },
    { id: 4, name: 'Workplace Security', phone: '+1-555-0999', email: 'security@work.com', relationship: 'Work', priority: 'low' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: '',
    priority: 'medium' as 'high' | 'medium' | 'low'
  });

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: Contact = {
        id: Date.now(),
        ...newContact
      };
      setContacts([...contacts, contact]);
      setNewContact({ name: '', phone: '', email: '', relationship: '', priority: 'medium' });
      setShowAddForm(false);
    }
  };

  const removeContact = (id: number) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const alertAllContacts = () => {
    alert(`Emergency alert sent to ${contacts.length} contacts! (This is a demo)`);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-emergency text-emergency-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Trust Network ({contacts.length} contacts)
            </CardTitle>
            <CardDescription>
              Your emergency contacts who will be notified if you need help
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button onClick={alertAllContacts} variant="emergency" size="sm">
              <Shield className="h-4 w-4 mr-2" />
              Alert All
            </Button>
            <Button onClick={() => setShowAddForm(!showAddForm)} variant="hero" size="sm">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Add Contact Form */}
        {showAddForm && (
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Add New Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Full Name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                />
                <Input
                  placeholder="Phone Number"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                />
                <Input
                  placeholder="Email Address"
                  value={newContact.email}
                  onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                />
                <Input
                  placeholder="Relationship (e.g., Family, Friend)"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={addContact} variant="hero">Add Contact</Button>
                <Button onClick={() => setShowAddForm(false)} variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Contacts List */}
        <div className="grid gap-4">
          {contacts.map((contact) => (
            <Card key={contact.id} className="hover:shadow-glow transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{contact.name}</h3>
                      <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{contact.phone}</span>
                        {contact.email && (
                          <>
                            <Mail className="h-3 w-3 text-muted-foreground ml-2" />
                            <span className="text-sm">{contact.email}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(contact.priority)}>
                      {contact.priority}
                    </Badge>
                    <Button
                      onClick={() => removeContact(contact.id)}
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}