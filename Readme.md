# CMS Development - Labo 4 & 5

Dit is de repository van Labo 4 & 5, uitgewerkt door Wouter Vlaeyen. De Wordpress installatie staat in `/bedrock` en de bijhorende React app in `/app`.

## Inhoud

- [CMS Development - Labo 4 & 5](#cms-development---labo-4--5)
  - [Inhoud](#inhoud)
  - [Media](#media)
  - [Setup](#setup)
    - [Wordpress](#wordpress)
    - [React App](#react-app)
  - [Gebruik](#gebruik)

## Media

De 3 vereiste screenshots van labo 4 staan in de map `/screenshots`. Enkel 1 screenshot toont het volledige scherm, aangezien deze techniek niet goed werkte bij de andere.

De screencast voor labo 5 is hier te vinden: [screencast](https://youtu.be/fXh-JiHiIT0)

## Setup

1. Kloon de Github repository

```bash
git clone https://github.com/cms-development/labo-week-4-5-Vl-Wouter.git
```

### Wordpress

1. Navigeer naar de `/bedrock` folder. Kopieer `.env.example`, hernoem dit naar `.env` en pas de variabelen aan:

* Database variables
  * `DB_NAME` - Database name
  * `DB_USER` - Database user
  * `DB_PASSWORD` - Database password
  * `DB_HOST` - Database host
  * Optionally, you can define `DATABASE_URL` for using a DSN instead of using the variables above (e.g. `mysql://user:password@127.0.0.1:3306/db_name`)
* `WP_ENV` - Set to environment (`development`, `staging`, `production`)
* `WP_HOME` - Full URL to WordPress home (https://example.com)
* `WP_SITEURL` - Full URL to WordPress including subdirectory (https://example.com/wp)
* `AUTH_KEY`, `SECURE_AUTH_KEY`, `LOGGED_IN_KEY`, `NONCE_KEY`, `AUTH_SALT`, `SECURE_AUTH_SALT`, `LOGGED_IN_SALT`, `NONCE_SALT`
  * Generate with [wp-cli-dotenv-command](https://github.com/aaemnnosttv/wp-cli-dotenv-command)
  * Generate with [our WordPress salts generator](https://roots.io/salts.html)

2. Installeer hierna alle dependencies door het volgende commando uit te voeren in de terminal:

```bash
composer install
```

3. Open het project op een lokale server met de wp-cli:

```bash
wp server --port="8765"
```

"8765" is een voorbeeld en zou moeten overeenkomen met de ingestelde poort in `.env`

### React App

1. Navigeer naar `/app` en maak in deze folder een bestand `.env.local` aan met volgende inhoud:

```env
REACT_APP_BASE_API = URL voor Wordpress API (/wp/v2/)
REACT_APP_JWT_API = URL voor JWT authenticatie (jwt-auth/v1)
```

2. Installeer alle dependencies

```bash
npm install
```

3. Start de app met `yarn start`

## Gebruik

Het Wordpress admin dashboard is te vinden op `localhost:[PORT]/wp/wp-admin`

De React App zal draaien op `localhost:3000`

De default login-gegevens zijn de volgende:

```txt
username: admin
password: gdm_admin
```
