import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.4.1:1',
  releaseNotes: {
    en_US:
      'Adds a Set Regional Defaults action for the language, measurement system, date and time formats and food search region that CookTrace accounts start with. Requires StartOS 0.4.2 or later.',
    es_ES:
      'Añade la acción Establecer valores regionales predeterminados, para el idioma, el sistema de medida, los formatos de fecha y hora y la región de búsqueda de alimentos con los que empiezan las cuentas de CookTrace. Requiere StartOS 0.4.2 o posterior.',
    de_DE:
      'Neue Aktion Regionale Standardwerte festlegen für Sprache, Maßsystem, Datums- und Zeitformat und die Region der Lebensmittelsuche, mit denen CookTrace-Konten beginnen. Erfordert StartOS 0.4.2 oder neuer.',
    pl_PL:
      'Dodaje akcję Ustaw domyślne ustawienia regionalne dla języka, systemu miar, formatów daty i czasu oraz regionu wyszukiwania produktów, od których zaczynają konta CookTrace. Wymaga StartOS 0.4.2 lub nowszego.',
    fr_FR:
      "Ajoute l'action Définir les paramètres régionaux par défaut, pour la langue, le système de mesure, les formats de date et d'heure et la région de recherche des aliments avec lesquels les comptes CookTrace commencent. Nécessite StartOS 0.4.2 ou une version ultérieure.",
  },
  migrations: {
    up: async ({ effects }) => {},
    down: IMPOSSIBLE,
  },
})
