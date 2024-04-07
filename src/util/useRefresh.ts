import { useEffect, useState } from 'react';

export default function useRefresh(onRefresh?: () => void) {
    const [state, setState] = useState(false);
    useEffect(() => {}, [state]);

    function refresh() {
        setState((prev) => !prev);
        onRefresh?.();
    }

    return refresh;
}
