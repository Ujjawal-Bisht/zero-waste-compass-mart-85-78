
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
}

interface EmailManagerProps {
  onSendEmail?: (success: boolean) => void;
}

const EmailManager: React.FC<EmailManagerProps> = ({ onSendEmail }) => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    body: '',
    data: {} as Record<string, string>
  });
  
  useEffect(() => {
    fetchTemplates();
  }, []);
  
  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('email_templates')
        .select('*')
        .order('name');
        
      if (error) throw error;
      setTemplates(data || []);
    } catch (err) {
      console.error('Error fetching email templates:', err);
      toast.error('Failed to load email templates');
    } finally {
      setLoading(false);
    }
  };
  
  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setEmailData(prev => ({
        ...prev,
        subject: template.subject,
        body: template.body
      }));
    }
  };
  
  const handleSendEmail = async () => {
    if (!selectedTemplate || !emailData.to) {
      toast.error('Please select a template and provide a recipient email');
      return;
    }
    
    try {
      setSending(true);
      
      const { data, error } = await supabase.functions.invoke(
        'send-email',
        {
          body: {
            templateName: selectedTemplate.name,
            to: emailData.to,
            data: emailData.data
          }
        }
      );
      
      if (error) throw error;
      
      toast.success('Email sent successfully');
      
      if (onSendEmail) {
        onSendEmail(true);
      }
      
      // Reset form
      setEmailData({
        to: '',
        subject: '',
        body: '',
        data: {}
      });
      setSelectedTemplate(null);
      
    } catch (err) {
      console.error('Error sending email:', err);
      toast.error('Failed to send email');
      
      if (onSendEmail) {
        onSendEmail(false);
      }
    } finally {
      setSending(false);
    }
  };
  
  const handleDataChange = (key: string, value: string) => {
    setEmailData(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [key]: value
      }
    }));
  };
  
  // Extract placeholders from template body
  const extractPlaceholders = (text: string) => {
    const regex = /{{([^}]+)}}/g;
    const placeholders: string[] = [];
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      if (!placeholders.includes(match[1])) {
        placeholders.push(match[1]);
      }
    }
    
    return placeholders;
  };
  
  const placeholders = selectedTemplate 
    ? extractPlaceholders(selectedTemplate.body)
    : [];
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Send Email Notification</h3>
        
        {loading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="h-8 w-8 animate-spin text-zwm-primary" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template">Email Template</Label>
              <select
                id="template"
                className="w-full p-2 border rounded-md"
                onChange={(e) => handleTemplateSelect(e.target.value)}
                value={selectedTemplate?.id || ''}
              >
                <option value="">Select a template</option>
                {templates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.name}
                  </option>
                ))}
              </select>
            </div>
            
            {selectedTemplate && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient Email</Label>
                  <Input
                    id="recipient"
                    type="email"
                    value={emailData.to}
                    onChange={(e) => setEmailData({...emailData, to: e.target.value})}
                    placeholder="recipient@example.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Template Subject</Label>
                  <Input
                    value={emailData.subject}
                    disabled
                    className="bg-gray-50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Template Preview</Label>
                  <Textarea
                    value={emailData.body}
                    disabled
                    className="bg-gray-50 min-h-[150px]"
                  />
                </div>
                
                {placeholders.length > 0 && (
                  <div className="space-y-3 p-4 border rounded-md bg-gray-50">
                    <Label className="text-sm font-medium">Fill Template Variables</Label>
                    {placeholders.map((placeholder) => (
                      <div key={placeholder} className="space-y-1">
                        <Label htmlFor={`placeholder-${placeholder}`} className="text-xs">
                          {placeholder}
                        </Label>
                        <Input
                          id={`placeholder-${placeholder}`}
                          value={emailData.data[placeholder] || ''}
                          onChange={(e) => handleDataChange(placeholder, e.target.value)}
                          placeholder={`Enter value for ${placeholder}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
                
                <Button 
                  onClick={handleSendEmail} 
                  disabled={sending || !emailData.to}
                  className="w-full"
                >
                  {sending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Email'
                  )}
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailManager;
