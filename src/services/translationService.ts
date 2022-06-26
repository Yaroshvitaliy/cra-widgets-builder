const phrases: any = {
    en: {
        on: 'On',
        off: 'Off'
    },
    es: {
        on: 'Encendido',
        off: 'Apagado'
    },
    pt: {
        on: 'Ligado',
        off: 'Desligado'
    },
    fr: {
        on: 'Allumé',
        off: 'Éteint'
    },

    ru: {
        on: 'Включить',
        off: 'Выключить'
    }
}

export const translate = (phrase: string, language: string | undefined = 'en') =>
    (!!phrases[language] && !!phrases[language][phrase])
        ? phrases[language][phrase] as string
        : phrase;

export default translate;