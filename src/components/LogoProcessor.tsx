import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { removeBackground, loadImage } from '@/utils/backgroundRemoval';
import aurasafeLogo from "@/assets/aurasafe-logo.png";

export function LogoProcessor() {
  const [processing, setProcessing] = useState(false);
  const [processedLogo, setProcessedLogo] = useState<string | null>(null);

  const processLogo = async () => {
    try {
      setProcessing(true);
      
      // Load the original logo
      const response = await fetch(aurasafeLogo);
      const blob = await response.blob();
      const image = await loadImage(blob);
      
      // Remove background
      const processedBlob = await removeBackground(image);
      
      // Create URL for processed image
      const processedUrl = URL.createObjectURL(processedBlob);
      setProcessedLogo(processedUrl);
      
      // Download the processed image
      const link = document.createElement('a');
      link.href = processedUrl;
      link.download = 'aurasafe-logo-transparent.png';
      link.click();
      
    } catch (error) {
      console.error('Error processing logo:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Button 
        onClick={processLogo} 
        disabled={processing}
        variant="hero"
      >
        {processing ? 'Processing...' : 'Remove Logo Background'}
      </Button>
      
      {processedLogo && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Processed logo (transparent background):</p>
          <img 
            src={processedLogo} 
            alt="Processed Logo" 
            className="h-24 w-24 border border-border rounded"
            style={{ backgroundColor: 'transparent' }}
          />
        </div>
      )}
    </div>
  );
}