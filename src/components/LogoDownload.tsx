import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';

export function LogoDownload() {
  const downloadLogo = (logoUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = logoUrl;
    link.download = filename;
    link.click();
  };

  const logos = [
    {
      name: 'Aurasafe Logo',
      url: '/lovable-uploads/240b819f-9de3-46d8-94a8-23b66962c3af.png',
      filename: 'aurasafe-logo.png',
      description: 'Current Aurasafe logo'
    }
  ];

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5" />
          Download Aurasafe Logos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {logos.map((logo, index) => (
          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <img 
                src={logo.url} 
                alt={logo.name} 
                className="h-12 w-12 object-contain border rounded"
              />
              <div>
                <h3 className="font-medium">{logo.name}</h3>
                <p className="text-sm text-muted-foreground">{logo.description}</p>
              </div>
            </div>
            <Button
              onClick={() => downloadLogo(logo.url, logo.filename)}
              variant="outline"
              size="sm"
            >
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}