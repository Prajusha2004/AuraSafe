import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Shield, MapPin, Send, Clock, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CommunityPost {
  id: string;
  type: 'warning' | 'safe' | 'info';
  message: string;
  location: string;
  timestamp: Date;
  anonymous: boolean;
  author?: string;
  verified: boolean;
}

export function CommunityFeed() {
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: '1',
      type: 'warning',
      message: 'Poorly lit area near 5th Street subway entrance. Multiple women reported feeling uncomfortable here after 8 PM.',
      location: '5th Street Station',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      anonymous: true,
      verified: true
    },
    {
      id: '2',
      type: 'safe',
      message: 'Central Park security increased patrol frequency. Feeling much safer during evening jogs!',
      location: 'Central Park',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      anonymous: false,
      author: 'Sarah M.',
      verified: true
    },
    {
      id: '3',
      type: 'info',
      message: 'New emergency call box installed near the university library. Great safety improvement!',
      location: 'University District',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      anonymous: false,
      author: 'Jessica L.',
      verified: false
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [postType, setPostType] = useState<'warning' | 'safe' | 'info'>('info');
  const [location, setLocation] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const { toast } = useToast();

  const submitPost = () => {
    if (!newPost.trim() || !location.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both message and location.",
        variant: "destructive",
      });
      return;
    }

    const post: CommunityPost = {
      id: Date.now().toString(),
      type: postType,
      message: newPost,
      location,
      timestamp: new Date(),
      anonymous: isAnonymous,
      author: isAnonymous ? undefined : 'You',
      verified: false
    };

    setPosts([post, ...posts]);
    setNewPost('');
    setLocation('');
    
    toast({
      title: "Post Shared",
      description: "Your safety update has been shared with the community.",
    });
  };

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'safe': return <Shield className="h-4 w-4 text-safe" />;
      default: return <MapPin className="h-4 w-4 text-primary" />;
    }
  };

  const getPostBadge = (type: string) => {
    switch (type) {
      case 'warning': return <Badge variant="destructive">Warning</Badge>;
      case 'safe': return <Badge variant="secondary" className="bg-safe text-safe-foreground">Safe Zone</Badge>;
      default: return <Badge variant="outline">Info</Badge>;
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {/* New Post Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Share Safety Update
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select value={postType} onValueChange={(value: 'warning' | 'safe' | 'info') => setPostType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Post type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warning">⚠️ Warning</SelectItem>
                <SelectItem value="safe">🛡️ Safe Zone</SelectItem>
                <SelectItem value="info">ℹ️ Information</SelectItem>
              </SelectContent>
            </Select>
            
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm"
            />
          </div>

          <Textarea
            placeholder="Share what's happening in your area to help keep others safe..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="resize-none"
            rows={3}
          />

          <div className="flex justify-between items-center">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded"
              />
              Post anonymously
            </label>
            
            <Button onClick={submitPost} variant="hero">
              <Send className="h-4 w-4 mr-2" />
              Share Update
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Community Posts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Recent Community Updates</h3>
        
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="text-xs">
                    {post.anonymous ? '👤' : post.author?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {getPostBadge(post.type)}
                    <span className="text-xs text-muted-foreground">
                      {post.anonymous ? 'Anonymous' : post.author}
                    </span>
                    {post.verified && (
                      <Badge variant="outline" className="text-xs">✓ Verified</Badge>
                    )}
                  </div>
                  
                  <p className="text-sm mb-2">{post.message}</p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {post.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatTimestamp(post.timestamp)}
                    </span>
                  </div>
                </div>
                
                <div className="flex-shrink-0">
                  {getPostIcon(post.type)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">
            Community reports help keep everyone safer
          </p>
        </div>
      </div>
    </div>
  );
}