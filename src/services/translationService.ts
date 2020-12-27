const phrases: any = {
    en: {
        generate: 'Generate',
        on: 'On',
        off: 'Off'
    },
    ru: {
        generate: 'Сгенерировать',
        on: 'Вкл',
        off: 'Выкл'
    }
}

export const translate = (phrase: string, language: string) =>
    (!!phrases[language] && !!phrases[language][phrase])
        ? phrases[language][phrase] as string
        : phrase;

export default translate;