# Ember & Oak — Seattle Steakhouse (demo)

Sito web multipagina, cinematografico e "dark luxury" per **Ember & Oak**, una steakhouse **fittizia** di Seattle.
Progetto dimostrativo del portfolio di **Eros Digital Studio**.

Tecnologie: **Astro 7** (sito statico) · **GSAP 3** (ScrollTrigger, SplitText, Flip) · **Lenis** (smooth scroll).
Nessuna dipendenza a pagamento, nessuna API esterna, nessuna chiave da configurare.

---

## Pagine

| Pagina | Percorso | Funzionalità principali |
|---|---|---|
| Home | `/` | Preloader (solo alla prima visita), hero con braci animate su canvas, testo che si illumina allo scroll, galleria orizzontale "pinnata" delle specialità (desktop), contatori, parallax, CTA |
| Menu | `/menu/` | 7 sezioni, barra categorie sticky con scroll-spy, filtri dietetici (senza glutine, vegetariano, senza crostacei, signature), guida interattiva alla cottura, menu degustazione |
| Wine | `/wine/` | Carta dei vini filtrabile: ricerca, stile, regione, prezzo, "al calice", ordinamento; animazioni Flip, stato condivisibile nell'URL |
| Philosophy | `/philosophy/` | Filosofia culinaria in 4 pilastri, simulatore di frollatura (14–60 giorni), fornitori con distanze |
| Our Story | `/our-story/` | Timeline con linea che si disegna allo scroll, galleria degli ambienti, team |
| Private Dining | `/private-dining/` | Selettore delle sale (tab accessibili), pacchetti, modulo di richiesta **dimostrativo**, FAQ |
| Reservations | `/reservations/` | Prenotazione in 3 step: ospiti, calendario navigabile da tastiera, orari simulati, posto, dati, conferma **dimostrativa** e file `.ics` per il calendario |
| Contact | `/contact/` | Indirizzo, orari con indicatore "aperto ora" (ora di Seattle), mappa illustrata in SVG, modulo **dimostrativo**, FAQ |
| 404 | `/404.html` | Pagina di errore personalizzata |

La newsletter (nel footer di ogni pagina), le prenotazioni e i moduli sono **dimostrativi**: validano i dati e
simulano una risposta, ma non inviano né salvano nulla. Ogni modulo lo indica chiaramente all'utente.

---

## 1. Avviare il sito sul Mac

### Requisiti
- **Node.js 22.12 o superiore** (consigliato **Node 24 LTS**). Per verificare la versione:
  ```bash
  node -v
  ```
  Se non è installato, scarica l'installer "LTS" da <https://nodejs.org> oppure, con Homebrew:
  ```bash
  brew install node
  ```

### Avvio
1. Estrai lo ZIP e apri il **Terminale** nella cartella del progetto:
   ```bash
   cd ~/Downloads/ember-and-oak
   ```
2. Installa le dipendenze (solo la prima volta):
   ```bash
   npm install
   ```
3. Avvia il server di sviluppo:
   ```bash
   npm run dev
   ```
4. Apri <http://localhost:4321> nel browser. Le modifiche ai file si aggiornano in tempo reale.

### Build di produzione (facoltativa, per una verifica in locale)
```bash
npm run build
```
```bash
npm run preview
```
Il sito ottimizzato viene generato nella cartella `dist/` (immagini convertite in WebP in più dimensioni).

---

## 2. Pubblicare gratis su GitHub Pages

Il progetto include già il workflow `.github/workflows/deploy.yml`: a ogni push sul branch `main`, GitHub
compila e pubblica il sito. **L'URL e il percorso base vengono configurati in automatico** dal nome del repository.

1. Crea un account su <https://github.com>, se non lo hai già.
2. Crea un **nuovo repository** pubblico, per esempio `ember-and-oak`, **senza** README.
3. Dal Terminale, nella cartella del progetto, collega e carica il codice (sostituisci `TUO-UTENTE`):
   ```bash
   git init
   ```
   ```bash
   git add .
   ```
   ```bash
   git commit -m "Ember & Oak website"
   ```
   ```bash
   git branch -M main
   ```
   ```bash
   git remote add origin https://github.com/TUO-UTENTE/ember-and-oak.git
   ```
   ```bash
   git push -u origin main
   ```
   > Se lo ZIP contiene già una cartella `.git`, salta `git init` e `git commit` e parti da `git branch -M main`.
4. Su GitHub apri il repository → **Settings** → **Pages** → in **Build and deployment / Source** scegli **GitHub Actions**.
5. Vai nella scheda **Actions**: il workflow "Deploy to GitHub Pages" parte da solo (oppure avvialo con *Run workflow*).
   Dopo 1–2 minuti il sito è online su:
   ```
   https://TUO-UTENTE.github.io/ember-and-oak/
   ```

**Repository `TUO-UTENTE.github.io`**: se dai al repository esattamente questo nome, il sito viene pubblicato alla radice
(`https://TUO-UTENTE.github.io/`) senza modifiche al codice.

**Dominio personalizzato**: in `.github/workflows/deploy.yml`, nello step *Build*, aggiungi:
```yaml
        env:
          SITE_URL: https://www.tuodominio.com
          BASE_PATH: /
```
poi configura il dominio in *Settings → Pages → Custom domain*.

---

## 3. Personalizzazione rapida

| Cosa | Dove |
|---|---|
| Nome, indirizzo, telefono, email, orari, voci di navigazione | `src/data/site.ts` |
| Piatti, prezzi, menu degustazione, gradi di cottura | `src/data/menu.ts` |
| Carta dei vini | `src/data/wines.ts` |
| Colori, font, spaziature, tempi delle animazioni (design token) | `src/styles/global.css` (blocco `:root`) |
| Fotografie | `src/assets/img/` (sostituisci i file mantenendo lo stesso nome) |
| Logotipo | `src/components/Logo.astro` |
| Motore delle animazioni (Lenis, reveal, parallax, transizioni, cursore) | `src/scripts/main.ts` |
| Logica dei moduli e della newsletter | `src/scripts/forms.ts` |
| Immagine di anteprima per i social / favicon | `public/og-image.jpg`, `public/favicon.svg` |

### Collegare moduli e prenotazioni a un servizio reale
Le chiamate simulate passano da `fakeRequest()` in `src/scripts/forms.ts`. Per andare online basta sostituirle con
una `fetch()` verso un servizio di form (per esempio Formspree, Basin o Web3Forms, tutti con piano gratuito), verso una
piattaforma di newsletter oppure verso un sistema di prenotazione (OpenTable, Resy, Tock). Ricorda poi di rimuovere
gli avvisi "Demonstration" dalle pagine.

---

## 4. Qualità

- **Accessibilità**: HTML semantico, skip link, focus visibile, etichette su tutti i campi, errori inline collegati con
  `aria-describedby`, tab/radiogroup/calendario utilizzabili da tastiera, testo alternativo descrittivo, contrasti
  verificati sul fondo scuro.
- **Movimento ridotto**: con "Riduci movimento" attivo nel sistema operativo si disattivano preloader, smooth scroll,
  parallax, transizioni e animazioni. Tutti i contenuti restano visibili da subito.
- **Cursore personalizzato**: attivo solo con mouse o trackpad (`hover: hover` e `pointer: fine`); nei campi di testo
  torna il cursore nativo. Su touch non viene mai caricato.
- **Prestazioni**: immagini WebP responsive con `srcset`, lazy loading sotto la piega, font self-hosted con preload,
  animazioni solo su `transform`/`opacity`, canvas delle braci in pausa fuori schermo e con la scheda in background.
  JavaScript principale circa 55 KB gzip.
- **SEO**: title e description per pagina, canonical, Open Graph/Twitter card, dati strutturati `Restaurant` e `Menu`
  (Schema.org), `sitemap-index.xml` e `robots.txt` generati automaticamente.

Il preloader compare solo alla **prima visita della sessione** e dura circa 1,6 secondi. Per eliminarlo, rimuovi il
blocco `<div class="preloader">` in `src/layouts/Base.astro`.

---

## Struttura

```
ember-and-oak/
├─ .github/workflows/deploy.yml   # Pubblicazione automatica su GitHub Pages
├─ public/                        # favicon, og-image, apple-touch-icon
├─ src/
│  ├─ assets/img/                 # fotografie sorgente (ottimizzate in build)
│  ├─ components/                 # Header, Footer, Logo, Photo, PageHero, Icon, Newsletter
│  ├─ data/                       # site.ts, menu.ts, wines.ts
│  ├─ layouts/Base.astro          # <head>, SEO, preloader, transizioni, cursore
│  ├─ pages/                      # una pagina per file
│  ├─ scripts/                    # main.ts (motion), forms.ts, embers.ts
│  └─ styles/global.css           # design system
├─ astro.config.mjs
├─ CREDITS.md                     # crediti foto e licenze
└─ package.json
```

---

## Note legali
Ember & Oak è un ristorante **inventato**: persone, indirizzo (contrassegnato come demo), numeri di telefono
(prefisso 555, riservato agli esempi), email (dominio `.example`), menu e prezzi sono fittizi. Le fotografie
provengono da Unsplash, con licenza Unsplash (uso commerciale consentito); l'elenco completo è in `CREDITS.md`.
I produttori citati nella carta dei vini sono cantine reali, inserite come selezione illustrativa con prezzi inventati.

© Eros Digital Studio
