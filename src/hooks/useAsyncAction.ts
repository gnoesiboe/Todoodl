import { useCallback, useState } from 'react';

export type AsyncActionState<ResultType> = {
    loading: boolean;
    result: ResultType | null;
    error: Error | unknown | null;
};

export default function useAsyncAction<ResultType>(callback: () => Promise<ResultType>) {
    const [state, setState] = useState<AsyncActionState<ResultType>>({
        loading: false,
        result: null,
        error: null,
    });

    const execute = useCallback(() => {
        setState((currentState) => ({
            ...currentState,
            loading: true,
            error: null,
        }));

        return callback()
            .then((result) => {
                setState({
                    loading: false,
                    result,
                    error: null,
                });
            })
            .catch((error) => {
                setState({
                    loading: false,
                    result: null,
                    error,
                });
            });
    }, [callback, setState]);

    const overrideResult = useCallback(
        (result: ResultType) => {
            setState((currentState) => ({
                ...currentState,
                result,
            }));
        },
        [setState],
    );

    return { execute, ...state, overrideResult };
}
