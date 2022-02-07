import { useEffect, useState } from 'react';
import throttle from 'lodash.throttle';

type Dimensions = {
    width: number;
    height: number;
};

const throttleTime = 100;

export default function useViewportDimensions(): Dimensions {
    const [dimensions, setDimensions] = useState<Dimensions>({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const onResize = throttle(
            (event: WindowEventMap['resize']) => {
                const window = event.target as Window;

                const newWidth = window.innerWidth;
                const newHeight = window.innerHeight;

                setDimensions((currentState) => {
                    if (currentState.width === newWidth && currentState.height === newHeight) {
                        return currentState;
                    }

                    return {
                        width: newWidth,
                        height: newHeight,
                    };
                });
            },
            throttleTime,
            {
                leading: false,
                trailing: true,
            },
        );

        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, []);

    return dimensions;
}
