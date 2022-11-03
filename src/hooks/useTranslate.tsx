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
}


export const useTranslate = ({ params, returnResults }: IUseTranslate) => {
    const runningRef = useRef<boolean>(false);
    const nextCallParamsRef = useRef<TranslateStatus>({} as TranslateStatus)

    useEffect(() => {
        nextCallParamsRef.current = ({
            ...params,
            done: false
        })
    }, [params])

    const startTranslate = useCallback(async () => {
        const currentParams = { ...nextCallParamsRef.current }
        const { texts, fromLanguage, toLanguage } = currentParams;

        if (!runningRef.current && !currentParams.done && fromLanguage !== toLanguage && texts !== "") {
            (async () => {
                console.log(`@@@@ starting to call translate API with ${texts}, ${fromLanguage}, ${toLanguage}`);
                runningRef.current = true;

                const results = await translate(texts, fromLanguage, toLanguage);
                console.log("@@@@ get results form API: ", results);
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
