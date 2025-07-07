import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Camera, Mic, FileText, MapPin, Send, Play, Square, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type IncidentType = 'harassment' | 'suspicious' | 'accident' | 'crime' | 'other';

interface EvidenceFile {
  id: string;
  type: 'photo' | 'audio' | 'video';
  file: File;
  url: string;
}

export function IncidentReporting() {
  const [incidentType, setIncidentType] = useState<IncidentType>('other');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [evidence, setEvidence] = useState<EvidenceFile[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [shareWithAuthorities, setShareWithAuthorities] = useState(false);
  const [shareWithCommunity, setShareWithCommunity] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const incidentTypes = {
    harassment: { label: 'Harassment', icon: '⚠️', color: 'destructive' },
    suspicious: { label: 'Suspicious Activity', icon: '👁️', color: 'default' },
    accident: { label: 'Accident', icon: '🚨', color: 'default' },
    crime: { label: 'Crime', icon: '🚔', color: 'destructive' },
    other: { label: 'Other', icon: '📝', color: 'outline' }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const fileType = file.type.startsWith('image/') ? 'photo' : 
                      file.type.startsWith('video/') ? 'video' : 'audio';
      
      const evidenceFile: EvidenceFile = {
        id: Date.now().toString() + Math.random(),
        type: fileType,
        file,
        url: URL.createObjectURL(file)
      };

      setEvidence(prev => [...prev, evidenceFile]);
    });

    toast({
      title: "Evidence Added",
      description: `${files.length} file(s) uploaded successfully.`,
    });
  };

  const startAudioRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const file = new File([blob], `recording-${Date.now()}.wav`, { type: 'audio/wav' });
        
        const evidenceFile: EvidenceFile = {
          id: Date.now().toString(),
          type: 'audio',
          file,
          url: URL.createObjectURL(blob)
        };

        setEvidence(prev => [...prev, evidenceFile]);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      toast({
        title: "Recording Started",
        description: "Audio recording in progress...",
      });

    } catch (error) {
      toast({
        title: "Recording Failed",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopAudioRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }

      toast({
        title: "Recording Stopped",
        description: "Audio evidence saved successfully.",
      });
    }
  };

  const removeEvidence = (id: string) => {
    setEvidence(prev => {
      const file = prev.find(f => f.id === id);
      if (file) {
        URL.revokeObjectURL(file.url);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Location Not Supported",
        description: "Geolocation is not supported by this browser.",
        variant: "destructive",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        toast({
          title: "Location Added",
          description: "Current location has been added to the report.",
        });
      },
      () => {
        toast({
          title: "Location Access Denied",
          description: "Please enter location manually or enable location access.",
          variant: "destructive",
        });
      }
    );
  };

  const submitReport = () => {
    if (!description.trim()) {
      toast({
        title: "Description Required",
        description: "Please provide a description of the incident.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would upload files and submit to backend
    toast({
      title: "Report Submitted",
      description: `Incident report submitted successfully. ${evidence.length} evidence files attached.`,
    });

    // Reset form
    setDescription('');
    setLocation('');
    setEvidence([]);
    setIncidentType('other');
    setShareWithAuthorities(false);
    setShareWithCommunity(true);
  };

  const formatRecordingTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-primary" />
          Report Safety Incident
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Help make the community safer by reporting incidents with evidence
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Incident Type */}
        <div>
          <label className="text-sm font-medium mb-2 block">Incident Type</label>
          <Select value={incidentType} onValueChange={(value: IncidentType) => setIncidentType(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select incident type" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(incidentTypes).map(([key, type]) => (
                <SelectItem key={key} value={key}>
                  {type.icon} {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium mb-2 block">Description *</label>
          <Textarea
            placeholder="Describe what happened, when, and any other relevant details..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="resize-none"
            rows={4}
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-medium mb-2 block">Location</label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter location or coordinates"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1"
            />
            <Button onClick={getCurrentLocation} variant="outline" size="sm">
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Evidence Collection */}
        <div>
          <label className="text-sm font-medium mb-2 block">Evidence</label>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="h-12"
            >
              <Camera className="h-4 w-4 mr-2" />
              Photo/Video
            </Button>
            
            <Button
              onClick={isRecording ? stopAudioRecording : startAudioRecording}
              variant={isRecording ? "destructive" : "outline"}
              className="h-12"
            >
              {isRecording ? (
                <>
                  <Square className="h-4 w-4 mr-2" />
                  Stop ({formatRecordingTime(recordingTime)})
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4 mr-2" />
                  Record Audio
                </>
              )}
            </Button>

            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="h-12"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload File
            </Button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,audio/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Evidence List */}
          {evidence.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Attached Evidence ({evidence.length})</h4>
              {evidence.map((file) => (
                <div key={file.id} className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                  <div className="flex-shrink-0">
                    {file.type === 'photo' && <Camera className="h-4 w-4" />}
                    {file.type === 'video' && <Play className="h-4 w-4" />}
                    {file.type === 'audio' && <Mic className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {file.type} • {(file.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <Button
                    onClick={() => removeEvidence(file.id)}
                    variant="ghost"
                    size="sm"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sharing Options */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Sharing Options</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={shareWithCommunity}
                onChange={(e) => setShareWithCommunity(e.target.checked)}
                className="rounded"
              />
              Share with community (helps others stay safe)
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={shareWithAuthorities}
                onChange={(e) => setShareWithAuthorities(e.target.checked)}
                className="rounded"
              />
              Share with local authorities
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <Button onClick={submitReport} variant="hero" className="w-full">
          <Send className="h-4 w-4 mr-2" />
          Submit Incident Report
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Your report helps build a safer community. All reports are handled confidentially.
        </p>
      </CardContent>
    </Card>
  );
}