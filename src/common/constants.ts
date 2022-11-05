export const availableLanguageOptions = [
    { value: 'en', label: 'English' },
    { value: 'ja', label: 'Japanese' },
    { value: 'zh', label: 'Chinese' },
    { value: 'ko', label: 'Korean' },
    { value: 'vi', label: 'Vietnamese' },
    { value: 'th', label: 'Thai' },
    { value: 'id', label: 'Indonesian' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'it', label: 'Italian' },
    { value: 'ru', label: 'Russian' },
    { value: 'pl', label: 'Polish' },
];

export function getOptionByCode(code: string) {
    return availableLanguageOptions.filter(el => el.value === code)[0]
}