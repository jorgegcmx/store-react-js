import { useEffect, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
export function useQueryParams() {

    const [queries, setQueries] = useState({})
    const { search } = useLocation();

    const onDecodeParams = useCallback((params) => {
        const replacefirst = params.replace('?', '');
        const replacesecund = replacefirst.replace('texto=', '');
        setQueries(replacesecund);

    }, [])



    useEffect(() => {
        if (search.trim()) {
            onDecodeParams(search);
        }

    }, [onDecodeParams, search])

    return queries;
}