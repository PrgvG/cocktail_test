import { ComponentProps, FC } from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchImage = async (src: string) => {
    const response = await fetch(src);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.blob();
};

type Props = {
    src: string;
    alt: string;
} & Omit<ComponentProps<'img'>, 'src' | 'alt'>;

export const LazyImg: FC<Props> = ({ src, alt, ...rest }) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['image', src],
        queryFn: () => fetchImage(src),
        staleTime: Infinity,
    });

    if (isLoading) {
        return <div>{alt}</div>;
    }

    if (error) {
        return <div>Error loading image</div>;
    }

    const imageUrl = URL.createObjectURL(data!);

    return <img {...rest} src={imageUrl} alt={alt} />;
};
