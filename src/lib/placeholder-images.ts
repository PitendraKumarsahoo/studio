import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  width: number;
  height: number;
};

const imageMap = new Map<string, ImagePlaceholder>();
(data.placeholderImages as ImagePlaceholder[]).forEach(img => {
  imageMap.set(img.id, img);
});

export function getPlaceholderImage(id: string): ImagePlaceholder {
  const img = imageMap.get(id);
  if (!img) {
    // Return a default or throw an error
    console.warn(`Placeholder image with id "${id}" not found.`);
    return {
        id: 'default',
        description: 'Default placeholder',
        imageUrl: 'https://picsum.photos/seed/default/400/300',
        imageHint: 'placeholder',
        width: 400,
        height: 300,
    };
  }
  return img;
}

export const allPlaceholderImages = data.placeholderImages as ImagePlaceholder[];
