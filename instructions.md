# CookTrace

## Documentation

- [CookTrace guide](https://traceapps.github.io/docs/cooktrace/) ([source](https://github.com/TraceApps/docs/tree/main/docs/cooktrace)) — recipes, the pantry, the cook diary, shopping, cookbooks and kitchens, imports, MCP and every Settings section
- [Accounts and sign-in](https://traceapps.github.io/docs/auth/local-users/) ([source](https://github.com/TraceApps/docs/tree/main/docs/auth)) — users, sessions and single sign-on providers such as Pocket ID
- [Integrations](https://traceapps.github.io/docs/integrations/notifications/) ([source](https://github.com/TraceApps/docs/tree/main/docs/integrations)) — ntfy and other notification services, email, and federation with the other Trace apps
- [Trace AI](https://traceapps.github.io/docs/trace/setup/) ([source](https://github.com/TraceApps/docs/tree/main/docs/trace)) — setting up the AI assistant and choosing a model
- [Android app](https://traceapps.github.io/docs/mobile/install/) ([source](https://github.com/TraceApps/docs/tree/main/docs/mobile)) — installing the app and connecting it to your server

## What you get on StartOS

- **Web UI** is the one address CookTrace has. It serves the web app, the API the Android and Wear OS apps sign in to, and the federation API NutriTrace and NoteTrace connect to.
- Sign-in is on from the start. StartOS creates the `admin` account for you, so nobody can claim your server by opening it first.
- Email, the address CookTrace puts in its links, and access for AI assistants are set with StartOS actions.
- Your recipes, photos, pantry, diary, accounts and settings are all in StartOS backups. CookTrace's own backup archives, from **Settings > Backup & Restore**, stay on the server but are left out of StartOS backups.
- CookTrace doesn't check GitHub for new releases. StartOS updates it.

## Getting set up

1. Run **Set Admin Password** when StartOS asks for it. Copy the username, `admin`, and the password it shows.
2. Start CookTrace and open the **Web UI**.
3. Sign in as `admin`.
4. Run **Set Regional Defaults** to choose the language, measurement system, date and time formats and food search country that your accounts start with.
5. To give someone else their own recipes, open **Settings > Users** and invite them, or use **Add User Manually** to set their username and password yourself. Invitations need email, so run **Configure SMTP** first. To share recipes across a household, set up a kitchen in **Settings > Kitchens**.

## Using CookTrace

### The admin password

Run **Set Admin Password** again whenever you need a new admin password, for instance if you've lost it. Browsers and phones already signed in as `admin` stay signed in.

**Settings > Users > Disable User Management** deletes every account along with everything in it, and leaves CookTrace open to anyone who can reach it. If it has been used, run **Set Admin Password** to turn sign-in back on.

### Regional defaults

**Set Regional Defaults** fills in the language, measurement system, date and time formats and food search country for every account that hasn't chosen its own. Each person can still change theirs in **Settings > Regional & Units** and **Settings > Food Sources**. Accounts you add later get the defaults the next time CookTrace starts, or straight away if you run the action again. To stop, run it with **Apply to accounts without their own settings** turned off; settings already filled in stay as they are.

### Bringing your recipes over

**Settings > Import from Another App** takes a Mealie backup, a Tandoor export or a Paprika `.paprikarecipes` file, up to 512 MB. Mealie isn't available on StartOS, so make the backup on the server you're moving from. Single recipes can come in from a web address or a file such as a PDF, and from a photo once Trace AI is set up.

### Email and links

Run **Configure SMTP** to let CookTrace send password resets, invitations, shared-recipe notices and weekly summaries. Choose **System Credentials** to use the SMTP server StartOS sends its own email with, or **Custom Credentials** to enter another. CookTrace's **Settings > Email (SMTP)** then shows the settings read-only. To check email works, use **Send Test** there.

The links in those emails, and the invitation links **Settings > Users** gives you to copy, point at a public domain of the **Web UI** if it has one, otherwise at its `.local` address, which only works at home. To choose the address yourself, run **Set Primary URL**.

### Android and Wear OS apps

The Android app connects to the **Web UI** address, and the watch app pairs itself when you sign in on the phone. The app only uses HTTPS, so on your home network the phone has to trust your server's root certificate, just as your browser does.

### Connecting your other services

CookTrace can reach other services on this server at the HTTPS addresses StartOS shows for them. Use the address with your server's IP in it, such as `https://192.168.1.10:51454`, or a private or public domain you've added to that service. CookTrace can't look up `.local` names.

- **NutriTrace foods in your pantry**: in NutriTrace, create a token in **Settings > API Tokens** with the `read:foods` scope. In CookTrace, open **Settings > Food Sources > NutriTrace Federation**, paste NutriTrace's **Web UI** address and the token, and save each. CookTrace tests the connection as it saves.
- **Your recipes in NutriTrace**: in CookTrace, create a token in **Settings > API Tokens** with the `read:recipes` scope, then paste CookTrace's **Web UI** address and the token into NutriTrace's CookTrace settings.
- **Your shopping list in NoteTrace**: the same, with a token that has the `shopping` scope.
- **Notifications**: in **Settings > Notifications**, choose ntfy, Gotify or Apprise and enter its address. For ntfy, add a topic, and an access token if your ntfy requires sign-in.
- **Single sign-on**: in **Settings > Authentication**, add Pocket ID or another OpenID Connect provider. For Pocket ID, the issuer is the domain you chose with Pocket ID's **Set Primary URL**. In Pocket ID, add CookTrace as a client with PKCE, and set its callback URL to the address you open CookTrace at followed by `/api/auth/oidc/callback/` and the provider's number in CookTrace. The upstream Pocket ID guide lists the other values to copy across.
- **Webhooks**: in **Settings > Webhooks**, an admin can send cooked-meal, finished-shopping and out-of-stock events to Home Assistant, n8n or any other address, on your network or not.
- **Trace AI**: in **Settings > AI Assistant**, pick a provider and enter its key. A model on your own network has to be reachable from the browser you use CookTrace in.

### Signing in with Pocket ID or another provider

Your `admin` account has no email address, so before signing in with your provider, sign in with the password once and link the provider from your profile's **Linked Accounts**. After that, the provider signs you straight in.

For other accounts, CookTrace matches a provider sign-in to an account by email only when the provider says the email is verified. If the email belongs to an account but isn't verified, CookTrace refuses the sign-in and asks you to link the provider from your profile first, as above. If **Auto-Register New Users** is on for the provider, a sign-in whose email matches no account creates a new, empty account rather than signing into an existing one.

If you set an admin group on the provider, anyone who signs in through it without being in that group becomes a regular user, `admin` included. Running **Set Admin Password** makes `admin` an admin again.

### AI assistants and your own scripts

CookTrace can answer AI assistants such as Claude Desktop over MCP, at the **Web UI** address followed by `/api/mcp`, and your own scripts over its REST API at `/api/v1`. Both are off until you run **Configure API Access** and choose how much they may do: read; also log cooks, add and tick off shopping items and update pantry stock; or also, through MCP only, create recipes and pantry items and delete diary entries and shopping items. Then create a token in **Settings > API Tokens** with the matching `mcp:` scopes and give it to the assistant or script. NutriTrace and NoteTrace connect whichever you choose, even **Off**.

### Connections CookTrace makes itself

CookTrace fetches the recipe pages you import from, and looks pantry items up in Open Food Facts and USDA. Those sites see your server's IP address. If you publish CookTrace through a tunnel to keep your home IP private, send its outbound traffic through that tunnel too. If you use a tunnel for another reason, such as a port your router can't forward, there's nothing to change.
