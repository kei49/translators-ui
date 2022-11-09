import { useCallback, useEffect, useRef } from "react"
import _ from "lodash";

import { translate } from "../apis/translate";

interface TranslateParams {
    texts: string;
    fromLanguage: string;
    toLanguage: string;
}

interface TranslateStatus extends TranslateParams {
    done: boolean;
}

interface IUseTranslate {
    params: TranslateParams;
    returnResults: (texts: string) => void;
    doTranslateAll: boolean
}


export const useTranslate = ({ params, returnResults, doTranslateAll }: IUseTranslate) => {
    const runningRef = useRef<boolean>(false);
    const nextCallParamsRef = useRef<TranslateStatus>({} as TranslateStatus)
    const doTranslateAllRef = useRef<boolean>(false);

    useEffect(() => {
        doTranslateAllRef.current = doTranslateAll;
    }, [doTranslateAll])

    useEffect(() => {
        if (!_.isEqual(_.omit(nextCallParamsRef.current, 'done'), params)) {
            nextCallParamsRef.current = ({
                ...params,
                done: false
            })
        }        
    }, [params])

    const startTranslate = useCallback(async () => {
        const currentParams = { ...nextCallParamsRef.current }
        const { texts, fromLanguage, toLanguage, done } = currentParams;

        if (!runningRef.current && !done && fromLanguage !== toLanguage && texts !== "") {
            (async () => {
                console.log(`@@@@@ starting to call translate API with ${texts}, ${fromLanguage}, ${toLanguage}, ${done}`);
                runningRef.current = true;

                const results = await translate(texts, fromLanguage, toLanguage, doTranslateAllRef.current);
                console.log("get results form API: ", results);
                returnResults(results);
                
                if (_.isEqual(currentParams, nextCallParamsRef.current)) {
                    nextCallParamsRef.current.done = true;
                }

                runningRef.current = false;
            })()
        }
    }, [returnResults])

    useEffect(() => {
        setInterval(() => {
            startTranslate()
        }, 500);
    }, [startTranslate])
}
