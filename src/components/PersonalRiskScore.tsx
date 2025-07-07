import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertTriangle, Clock, MapPin, TrendingUp } from 'lucide-react';

interface RiskFactor {
  name: string;
  score: number;
  description: string;
  icon: React.ComponentType<any>;
}

export function PersonalRiskScore() {
  const [riskScore, setRiskScore] = useState(2.3);
  const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('low');
  const [riskFactors, setRiskFactors] = useState<RiskFactor[]>([]);

  useEffect(() => {
    // Simulate real-time risk calculation based on various factors
    const calculateRiskScore = () => {
      const currentHour = new Date().getHours();
      const isNightTime = currentHour < 6 || currentHour > 20;
      const isWeekend = [0, 6].includes(new Date().getDay());
      
      // Mock location-based risk (would use real geolocation data)
      const locationRisk = Math.random() * 2; // 0-2
      const timeRisk = isNightTime ? 1.5 : 0.5; // Higher at night
      const crowdRisk = isWeekend ? 0.8 : 1.2; // Lower on weekends (more people around)
      const weatherRisk = Math.random() * 0.5; // 0-0.5 (mock weather data)
      
      const totalRisk = (locationRisk + timeRisk + crowdRisk + weatherRisk) / 4;
      
      // Update risk factors
      const factors: RiskFactor[] = [
        {
          name: 'Time of Day',
          score: timeRisk,
          description: isNightTime ? 'Night time increases risk' : 'Daytime is safer',
          icon: Clock
        },
        {
          name: 'Location Safety',
          score: locationRisk,
          description: locationRisk > 1 ? 'Area has recent incidents' : 'Area is generally safe',
          icon: MapPin
        },
        {
          name: 'Crowd Density',
          score: crowdRisk,
          description: crowdRisk > 1 ? 'Low crowd density' : 'Good crowd presence',
          icon: Shield
        },
        {
          name: 'Weather Conditions',
          score: weatherRisk,
          description: weatherRisk > 0.3 ? 'Poor visibility conditions' : 'Clear conditions',
          icon: TrendingUp
        }
      ];
      
      setRiskFactors(factors);
      setRiskScore(Math.round(totalRisk * 10) / 10);
      
      if (totalRisk < 1) setRiskLevel('low');
      else if (totalRisk < 2) setRiskLevel('medium');
      else setRiskLevel('high');
    };

    calculateRiskScore();
    
    // Update risk score every 30 seconds
    const interval = setInterval(calculateRiskScore, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getRiskColor = () => {
    switch (riskLevel) {
      case 'low': return 'text-safe';
      case 'medium': return 'text-warning';
      case 'high': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBadgeVariant = () => {
    switch (riskLevel) {
      case 'low': return 'secondary';
      case 'medium': return 'default';
      case 'high': return 'destructive';
      default: return 'outline';
    }
  };

  const getRiskMessage = () => {
    switch (riskLevel) {
      case 'low': return 'You\'re in a safe environment. Enjoy your time!';
      case 'medium': return 'Stay alert and be aware of your surroundings.';
      case 'high': return 'Consider moving to a safer location or alerting contacts.';
      default: return '';
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Personal Risk Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Risk Score */}
        <div className="text-center">
          <div className={`text-6xl font-bold ${getRiskColor()}`}>
            {riskScore}
          </div>
          <div className="text-lg text-muted-foreground mb-2">out of 5</div>
          <Badge variant={getRiskBadgeVariant()} className="mb-3">
            {riskLevel.toUpperCase()} RISK
          </Badge>
          <p className="text-sm text-muted-foreground">
            {getRiskMessage()}
          </p>
        </div>

        {/* Risk Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Safe</span>
            <span>High Risk</span>
          </div>
          <Progress value={(riskScore / 5) * 100} className="h-2" />
        </div>

        {/* Risk Factors Breakdown */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Risk Factors</h4>
          {riskFactors.map((factor, index) => {
            const IconComponent = factor.icon;
            return (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                <IconComponent className="h-4 w-4 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{factor.name}</span>
                    <span className={`text-xs font-bold ${
                      factor.score > 1.5 ? 'text-destructive' : 
                      factor.score > 1 ? 'text-warning' : 'text-safe'
                    }`}>
                      {factor.score.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {factor.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Last Updated */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
          <p className="text-xs text-muted-foreground">
            Updates automatically every 30 seconds
          </p>
        </div>
      </CardContent>
    </Card>
  );
}