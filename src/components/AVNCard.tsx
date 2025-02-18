
import { AVN } from "@/types/avn";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface AVNCardProps {
  avn: AVN;
}

export const AVNCard = ({ avn }: AVNCardProps) => {
  return (
    <Link to={`/avn/${avn.id}`}>
      <Card className="group hover:shadow-lg transition-shadow duration-300 cursor-pointer animate-fadeIn">
        <CardHeader className="p-0">
          <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg">
            <img
              src={avn.image}
              alt={avn.title}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
            {avn.featured && (
              <Badge className="absolute top-2 right-2 bg-primary/90 hover:bg-primary">
                Featured
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-lg leading-tight mb-1">{avn.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">{avn.developer}</p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-medium">{avn.rating}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {avn.genre.map((g) => (
              <Badge key={g} variant="secondary" className="text-xs">
                {g}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
