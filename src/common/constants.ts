export const availableLanguageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'it', label: 'Italian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'ru', label: 'Russian' },
    { value: 'vi', label: 'Vietnamese' },
    { value: 'zh', label: 'Chinese' },
    { value: 'id', label: 'Indonesian' },
    { value: 'pl', label: 'Polish' },
    { value: 'th', label: 'Thai' },
];

export function getOptionByCode(code: string) {
    return availableLanguageOptions.filter(el => el.value === code)[0]
}