import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import {
  Bell,
  Mail,
  Smartphone,
  Moon,
  Sun,
  Palette,
  Languages,
  Clock,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTheme } from 'next-themes';

const COLOR_SCHEMES = [
  { value: 'purple', label: 'Purple (Default)' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'orange', label: 'Orange' }
];

const SettingsTab: React.FC = () => {
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [messageAlerts, setMessageAlerts] = useState(true);

  // Appearance settings
  const { setTheme, theme: currentTheme, resolvedTheme } = useTheme();
  const [themeMode, setThemeMode] = useState<'system' | 'dark' | 'light'>('system');
  const [colorScheme, setColorScheme] = useState('purple');

  // Synchronize internal state with actual next-themes state for reliable dark mode switch
  useEffect(() => {
    // set system as default if currentTheme is undefined
    setThemeMode((currentTheme as 'system' | 'dark' | 'light') || 'system');
  }, [currentTheme]);

  // Regional settings
  const [language, setLanguage] = useState('english');
  const [timeZone, setTimeZone] = useState('UTC');
  const [dateFormat, setDateFormat] = useState('MM/DD/YYYY');

  // API settings
  const [apiKey, setApiKey] = useState('');
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);

  const handleGenerateApiKey = () => {
    setIsGeneratingKey(true);
    setTimeout(() => {
      setApiKey(`sk_seller_${Math.random().toString(36).substring(2, 15)}`);
      setIsGeneratingKey(false);
      toast.success('New API key generated successfully');
    }, 1000);
  };

  const handleSaveNotifications = () => {
    toast.success('Notification settings saved successfully');
  };

  const handleSaveAppearance = () => {
    // Apply to Tailwind/next-themes context for dark mode
    setTheme(themeMode); // will be 'dark', 'light', or 'system'
    toast.success('Appearance settings saved successfully');
  };

  const handleSaveRegional = () => {
    toast.success('Regional settings saved successfully');
  };

  useEffect(() => {
    if (currentTheme !== themeMode) {
      setTheme(themeMode);
    }
  }, [themeMode, setTheme, currentTheme]);

  return (
    <div className="space-y-6">
      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-purple-500" />
              Notification Settings
            </CardTitle>
            <CardDescription>Configure how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
              </div>
              <Switch
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Order Alerts</Label>
                <p className="text-sm text-muted-foreground">Receive alerts for new orders</p>
              </div>
              <Switch
                checked={orderAlerts}
                onCheckedChange={setOrderAlerts}
              />
            </div>
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Message Alerts</Label>
                <p className="text-sm text-muted-foreground">Receive alerts for new messages</p>
              </div>
              <Switch
                checked={messageAlerts}
                onCheckedChange={setMessageAlerts}
              />
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button onClick={handleSaveNotifications}>Save Notification Settings</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Appearance Settings */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-purple-500" />
              Appearance Settings
            </CardTitle>
            <CardDescription>Customize the look and feel of your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Theme (Dark/Light)</Label>
                <Select value={themeMode} onValueChange={(val) => setThemeMode(val as 'system' | 'dark' | 'light')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        Light
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        Dark
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <Languages className="h-4 w-4" />
                        System Default
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {/* Current theme preview */}
                <div className="mt-2 inline-flex gap-2 text-xs">
                  <span>Preview:&nbsp;</span>
                  <span className="px-2 rounded bg-gray-50 dark:bg-gray-800 border">
                    {(themeMode === 'system' ? resolvedTheme : themeMode) || 'system'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Color Scheme</Label>
                <Select value={colorScheme} onValueChange={setColorScheme}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color scheme" />
                  </SelectTrigger>
                  <SelectContent>
                    {COLOR_SCHEMES.map(scheme =>
                      <SelectItem key={scheme.value} value={scheme.value}>
                        {scheme.label}
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button onClick={handleSaveAppearance}>Save Appearance Settings</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Regional Settings */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5 text-purple-500" />
              Regional Settings
            </CardTitle>
            <CardDescription>Configure language and regional preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Time Zone</Label>
                <Select value={timeZone} onValueChange={setTimeZone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time zone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="EST">Eastern Standard Time (EST)</SelectItem>
                    <SelectItem value="CST">Central Standard Time (CST)</SelectItem>
                    <SelectItem value="PST">Pacific Standard Time (PST)</SelectItem>
                    <SelectItem value="IST">India Standard Time (IST)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Date Format</Label>
                <Select value={dateFormat} onValueChange={setDateFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                    <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end">
              <Button onClick={handleSaveRegional}>Save Regional Settings</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* API Settings */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-500" />
              API Access
            </CardTitle>
            <CardDescription>Manage API keys for external integrations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>API Key</Label>
              <div className="flex gap-2">
                <Input value={apiKey} readOnly className="flex-1 font-mono text-sm" />
                <Button 
                  onClick={handleGenerateApiKey} 
                  disabled={isGeneratingKey}
                >
                  {isGeneratingKey ? 'Generating...' : 'Generate New Key'}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground pt-2">
                This API key provides full access to your seller account. Keep it secure.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SettingsTab;
