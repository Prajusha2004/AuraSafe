import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, AlertTriangle, Shield, MapPin, Clock, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Alert {
  id: number;
  type: 'warning' | 'danger' | 'info';
  title: string;
  message: string;
  location?: string;
  time: string;
  isRead: boolean;
}

export function AlertsInterface() {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: 'danger',
      title: 'High Crime Area Alert',
      message: 'Multiple incidents reported in your current area. Consider using alternate route.',
      location: 'Downtown District',
      time: '2 minutes ago',
      isRead: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Trust Network Check-in',
      message: 'Sarah is requesting your location for safety check-in.',
      time: '15 minutes ago',
      isRead: false
    },
    {
      id: 3,
      type: 'info',
      title: 'Safe Route Available',
      message: 'AI found a safer alternate route to your destination with better lighting.',
      time: '1 hour ago',
      isRead: true
    }
  ]);

  const markAsRead = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
  };

  const dismissAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast({
      title: "Alert dismissed",
      description: "Alert has been removed from your list.",
    });
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'danger': return <AlertTriangle className="h-5 w-5 text-emergency" />;
      case 'warning': return <Bell className="h-5 w-5 text-warning" />;
      case 'info': return <Shield className="h-5 w-5 text-primary" />;
      default: return <Bell className="h-5 w-5" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'danger': return 'bg-emergency text-emergency-foreground';
      case 'warning': return 'bg-warning text-warning-foreground';
      case 'info': return 'bg-primary text-primary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Safety Alerts ({alerts.length})
          </div>
          {unreadCount > 0 && (
            <Badge variant="destructive">
              {unreadCount} unread
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          Real-time safety notifications and updates from your AI shield
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No active alerts. Your AI shield is protecting you!</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <Card 
              key={alert.id} 
              className={`transition-all hover:shadow-glow ${!alert.isRead ? 'border-primary/50' : ''}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{alert.title}</h4>
                        <Badge className={getAlertColor(alert.type)} variant="outline">
                          {alert.type}
                        </Badge>
                        {!alert.isRead && (
                          <div className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {alert.message}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {alert.time}
                        </div>
                        {alert.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {alert.location}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {!alert.isRead && (
                      <Button
                        onClick={() => markAsRead(alert.id)}
                        variant="outline"
                        size="sm"
                      >
                        Mark Read
                      </Button>
                    )}
                    <Button
                      onClick={() => dismissAlert(alert.id)}
                      variant="outline"
                      size="sm"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
}