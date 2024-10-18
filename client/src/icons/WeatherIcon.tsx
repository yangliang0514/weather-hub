import {
  Cloud,
  CloudFog,
  CloudMoon,
  CloudMoonRain,
  CloudRain,
  CloudSnow,
  CloudSun,
  Cloudy,
  Haze,
  Moon,
  Snowflake,
  Sun,
  ThermometerSnowflake,
  ThermometerSun,
  Wind,
} from "lucide-react";

export default function WeatherIcon({
  iconNum,
  className,
}: {
  iconNum: number;
  className?: string;
}) {
  if (iconNum >= 1 && iconNum <= 4) {
    return <Sun className={className} size={48} strokeWidth={1} />;
  }

  if (iconNum === 5) {
    return <Haze className={className} size={48} strokeWidth={1} />;
  }

  if (iconNum >= 6 && iconNum <= 8) {
    return <Cloud className={className} size={48} strokeWidth={1} />;
  }

  if (iconNum === 11) {
    return <CloudFog className={className} size={48} strokeWidth={1} />;
  }

  if (iconNum >= 12 && iconNum <= 18) {
    return <CloudRain className={className} size={48} strokeWidth={1} />;
  }

  if (iconNum === 19) {
    return <Cloudy className={className} size={48} strokeWidth={1} />;
  }

  if (iconNum >= 20 && iconNum <= 23) {
    return <CloudSun className={className} size={48} strokeWidth={1} />;
  }

  if (iconNum === 24) {
    return <Snowflake className={className} size={48} strokeWidth={1} />;
  }

  if (iconNum >= 25 && iconNum <= 29) {
    return <CloudSnow className={className} size={48} strokeWidth={1} />;
  }

  if (iconNum === 30) {
    return <ThermometerSun className={className} size={48} strokeWidth={1} />;
  }

  if (iconNum === 31) {
    return (
      <ThermometerSnowflake className={className} size={48} strokeWidth={1} />
    );
  }

  if (iconNum === 32) {
    return <Wind className={className} size={48} strokeWidth={1} />;
  }

  if (iconNum >= 33 && iconNum <= 34) {
    return <Moon className={className} size={48} strokeWidth={1} />;
  }

  if (iconNum >= 35 && iconNum <= 38) {
    return <CloudMoon className={className} size={48} strokeWidth={1} />;
  }

  if (iconNum >= 39 && iconNum <= 44) {
    return <CloudMoonRain className={className} size={48} strokeWidth={1} />;
  }

  return <></>;
}
