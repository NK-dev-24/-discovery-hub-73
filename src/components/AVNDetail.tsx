
import { AVN } from "@/types/avn";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Star } from "lucide-react";

interface AVNDetailProps {
  avn: AVN;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AVNDetail = ({ avn, open, onOpenChange }: AVNDetailProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{avn.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
            <img
              src={avn.image}
              alt={avn.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-lg font-medium mb-2">About</p>
              <p className="text-muted-foreground">{avn.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-medium">Rating:</p>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-primary text-primary" />
                <span className="font-medium">{avn.rating}</span>
                <span className="text-muted-foreground">
                  ({avn.reviewCount} reviews)
                </span>
              </div>
            </div>
            <div>
              <p className="text-lg font-medium mb-2">Developer</p>
              <p className="text-muted-foreground">{avn.developer}</p>
            </div>
            <div>
              <p className="text-lg font-medium mb-2">Genres</p>
              <div className="flex flex-wrap gap-2">
                {avn.genre.map((g) => (
                  <Badge key={g} variant="secondary">
                    {g}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {avn.website && (
                <Button asChild>
                  <a href={avn.website} target="_blank" rel="noopener noreferrer">
                    Visit Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
              {avn.support && (
                <Button variant="outline" asChild>
                  <a href={avn.support} target="_blank" rel="noopener noreferrer">
                    Support Developer
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
