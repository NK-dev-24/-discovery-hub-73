
import { Platform, Distribution } from "@/types/avn";
import { ExternalLink } from "lucide-react";
import { FaWindows, FaApple, FaLinux, FaAndroid, FaMobile, FaGlobe, FaSteam, FaItchIo } from "react-icons/fa";
import { SiEpicgames } from "react-icons/si";

interface PlatformIconProps {
  platform: Platform;
}

export const PlatformIcon = ({ platform }: PlatformIconProps) => {
  const iconClass = "h-4 w-4";
  switch (platform) {
    case "Windows":
      return <FaWindows className={iconClass} />;
    case "Mac":
      return <FaApple className={iconClass} />;
    case "Linux":
      return <FaLinux className={iconClass} />;
    case "Android":
      return <FaAndroid className={iconClass} />;
    case "iOS":
      return <FaMobile className={iconClass} />;
    case "Web":
      return <FaGlobe className={iconClass} />;
    default:
      return null;
  }
};

interface DistributionIconProps {
  platform: Distribution["platform"];
  className?: string;
}

export const DistributionIcon = ({ platform, className }: DistributionIconProps) => {
  const iconClass = className || "h-4 w-4";
  switch (platform) {
    case "Steam":
      return <FaSteam className={iconClass} />;
    case "Itch.io":
      return <FaItchIo className={iconClass} />;
    case "Custom":
      return <SiEpicgames className={iconClass} />;
    case "Other":
      return <ExternalLink className={iconClass} />;
    default:
      return null;
  }
};
