import { LazyLoadImage } from "react-lazy-load-image-component";
import { tw } from "../../lib/helpers";

export function Image({ className, src, alt, ...props }) {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      className={tw("h-48 w-full", className)}
      {...props}
    />
  );
}
