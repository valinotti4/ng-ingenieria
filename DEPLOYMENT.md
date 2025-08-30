# Next.js Deployment Guide for Apache Server

This guide covers deploying your Next.js application on an Apache server with existing content, specifically preserving the `/meteo` path while serving the Next.js app for all other routes.

## Prerequisites

- Apache server with mod_proxy and mod_proxy_http enabled
- Node.js 18+ installed on server
- PM2 process manager (recommended)
- Webmin for server management
- SSH access to the server

## Step-by-Step Deployment

### 1. Server Preparation

#### Install Node.js (via SSH or Webmin)
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

#### Install PM2 globally
```bash
sudo npm install -g pm2
```

### 2. Local Build and File Preparation

#### Build the application locally
```bash
# In your local development environment
npm ci
npm run build
```

#### Prepare files for upload
Create a deployment package with only the necessary files:

**Required files/folders to upload:**
- `.next/` (build output - created after npm run build)
- `public/` (static assets)
- `package.json` and `package-lock.json`
- `next.config.ts`
- `ecosystem.config.js`
- Any environment files (`.env.production.local`)

**Files to exclude (do not upload):**
- `node_modules/` (will be installed on server)
- `.git/`
- `src/` or `app/` (source files - not needed in production)
- `components/` (source files - not needed in production)
- `lib/` (source files - not needed in production)
- Development files: `tsconfig.json`, `tailwind.config.js`, `postcss.config.mjs`, etc.
- Documentation files: `README.md`, `DEPLOYMENT.md`, etc.

#### Upload files to server
Upload the prepared files to your server directory: `/home/ng/public_html/ng-ingenieria/`
- Use SCP, SFTP, or your preferred file transfer method
- Ensure the `.next` folder and all its contents are uploaded
- Maintain the folder structure

#### Install production dependencies on server
```bash
cd /home/ng/public_html/ng-ingenieria/
npm ci --only=production
```

### 3. Configure PM2

#### Start the application with PM2
The `ecosystem.config.js` file is already configured for your server path.

```bash
cd /home/ng/public_html/ng-ingenieria/
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 4. Apache Configuration via Webmin

#### Enable Required Apache Modules
In Webmin → Servers → Apache Webserver → Global Configuration → Configure Apache Modules:
- Enable `proxy_module`
- Enable `proxy_http_module`
- Enable `rewrite_module`

#### Update Your Existing Virtual Host Configuration

You need to edit your existing `/etc/apache2/sites-available/ng.com.ar.conf` file (or through Webmin → Servers → Apache Webserver → Virtual Hosts → ng.com.ar).

**Add these lines to BOTH virtual hosts (HTTP on port 80 and HTTPS on port 443) before the closing `</VirtualHost>` tag:**

```apache
    # Serve existing meteo content as static files (if it exists)
    Alias /meteo /home/ng/public_html/meteo
    <Directory "/home/ng/public_html/meteo">
        AllowOverride All
        Require all granted
    </Directory>

    # Proxy configuration for Next.js
    ProxyPreserveHost On
    ProxyTimeout 300
    
    # Exclude meteo and existing paths from proxy
    ProxyPass /meteo !
    ProxyPass /cgi-bin !
    ProxyPass /awstats !
    ProxyPass /.well-known !
    
    # Proxy Next.js static assets
    ProxyPass /_next/ http://localhost:3000/_next/
    ProxyPassReverse /_next/ http://localhost:3000/_next/
    
    # Proxy API routes
    ProxyPass /api/ http://localhost:3000/api/
    ProxyPassReverse /api/ http://localhost:3000/api/
    
    # Proxy favicon and other assets
    ProxyPass /favicon.ico http://localhost:3000/favicon.ico
    ProxyPassReverse /favicon.ico http://localhost:3000/favicon.ico
    
    # Proxy everything else to Next.js (this should be LAST)
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
```

**Your final virtual host configuration should look like this:**

```apache
<VirtualHost 149.50.131.152:80 [2800:6c0:5::2a0]:80>
    SuexecUserGroup #1003 #1002
    ServerName ng.com.ar
    ServerAlias www.ng.com.ar
    ServerAlias mail.ng.com.ar
    ServerAlias webmail.ng.com.ar
    ServerAlias admin.ng.com.ar
    DocumentRoot /home/ng/public_html
    ErrorLog /var/log/virtualmin/ng.com.ar_error_log
    CustomLog /var/log/virtualmin/ng.com.ar_access_log combined
    ScriptAlias /cgi-bin/ /home/ng/cgi-bin/
    ScriptAlias /awstats /home/ng/cgi-bin/awstats.pl
    DirectoryIndex index.php index.htm index.html
    <Directory /home/ng/public_html>
        Options -Indexes +IncludesNOEXEC +SymLinksIfOwnerMatch 
        Require all granted
        AllowOverride All Options=ExecCGI,Includes,IncludesNOEXEC,Indexes,MultiViews,SymLinksIfOwnerMatch
    </Directory>
    <Directory /home/ng/cgi-bin>
        Require all granted
        AllowOverride All Options=ExecCGI,Includes,IncludesNOEXEC,Indexes,MultiViews,SymLinksIfOwnerMatch
    </Directory>
    ProxyPass /.well-known !
    RewriteEngine on
    RewriteCond %{HTTP_HOST} =webmail.ng.com.ar
    RewriteRule ^/(?!.well-known)(.*)$ https://ng.com.ar:20000/ [R]
    RewriteCond %{HTTP_HOST} =admin.ng.com.ar
    RewriteRule ^/(?!.well-known)(.*)$ https://ng.com.ar:10000/ [R]
    RemoveHandler .php
    RemoveHandler .php8.2
    <FilesMatch \.php$>
        SetHandler proxy:unix:/run/php/1754673173265581.sock|fcgi://127.0.0.1
    </FilesMatch>
    RedirectMatch ^/awstats$ /awstats/
    <Files awstats.pl>
        AuthName "ng.com.ar statistics"
        AuthType Basic
        AuthUserFile /home/ng/.awstats-htpasswd
        require valid-user
    </Files>

    # NEW: Next.js proxy configuration
    Alias /meteo /home/ng/public_html/meteo
    <Directory "/home/ng/public_html/meteo">
        AllowOverride All
        Require all granted
    </Directory>
    ProxyPreserveHost On
    ProxyTimeout 300
    ProxyPass /meteo !
    ProxyPass /cgi-bin !
    ProxyPass /awstats !
    ProxyPass /_next/ http://localhost:3000/_next/
    ProxyPassReverse /_next/ http://localhost:3000/_next/
    ProxyPass /api/ http://localhost:3000/api/
    ProxyPassReverse /api/ http://localhost:3000/api/
    ProxyPass /favicon.ico http://localhost:3000/favicon.ico
    ProxyPassReverse /favicon.ico http://localhost:3000/favicon.ico
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
</VirtualHost>
```

**Apply the same proxy configuration to your HTTPS virtual host (port 443) as well.**

### 5. Apply Configuration Changes

#### Apply Configuration Changes via Webmin

1. **Via Webmin Interface:**
   - Go to Webmin → Servers → Apache Webserver → Virtual Hosts
   - Select your ng.com.ar virtual host
   - Add the proxy configuration lines shown above
   - Apply and restart Apache

2. **Or via SSH/Command Line:**
```bash
# Test Apache configuration syntax
sudo apache2ctl configtest

# Restart Apache to apply changes  
sudo systemctl restart apache2

# Check Apache status
sudo systemctl status apache2
```

### 6. Testing the Deployment

#### Test the Next.js application
```bash
# Check if PM2 process is running
pm2 status

# Check Next.js logs
pm2 logs ng-ingenieria

# Test direct access to Next.js (from server)
curl http://localhost:3000
```

#### Test the complete setup
```bash
# Test Next.js app through Apache proxy
curl http://ng.com.ar/

# Test API endpoint
curl http://ng.com.ar/api/contact

# Test if meteo still works (if it exists)
curl http://ng.com.ar/meteo
```

### 7. Verification Checklist

- [ ] `https://ng.com.ar/meteo` serves the existing meteo page (if it exists)
- [ ] `https://ng.com.ar/` serves the Next.js homepage  
- [ ] `https://ng.com.ar/dolar` serves the Next.js dolar page
- [ ] `https://ng.com.ar/api/contact` returns the API response
- [ ] All Next.js assets load correctly
- [ ] All existing functionality (webmail, admin, awstats) still works
- [ ] PM2 process is running and will restart on server reboot

## Monitoring and Maintenance

### PM2 Commands
```bash
# View running processes
pm2 status

# View logs
pm2 logs ng-ingenieria

# Restart application
pm2 restart ng-ingenieria

# Stop application
pm2 stop ng-ingenieria

# Monitor resources
pm2 monit
```

### Update Deployment
```bash
# Local environment:
# 1. Build the application locally
npm run build

# 2. Upload the updated files to server:
# - Updated .next/ folder
# - Any changed static files in public/
# - Updated package.json (if dependencies changed)

# Server environment:
# 3. Install new dependencies (only if package.json changed)
npm ci --only=production

# 4. Restart PM2 process
pm2 restart ng-ingenieria
```

## Troubleshooting

### Common Issues

1. **502 Bad Gateway**: Check if PM2 process is running and Next.js is accessible on localhost:3000
2. **404 for assets**: Verify proxy configuration for `/_next/` paths
3. **API routes not working**: Ensure `/api/` paths are properly proxied
4. **Meteo page not loading**: Check the Alias configuration and file permissions

### Log Files to Check
- PM2 logs: `/var/log/pm2/ng-ingenieria.log`
- Apache error log: `/var/log/apache2/error.log`
- Apache access log: `/var/log/apache2/access.log`

## Environment Variables

If your application uses environment variables, create a `.env.production.local` file:

```bash
# Example environment variables
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://ng.com.ar
# Add your other environment variables here
```

## Security Considerations

- Ensure PM2 process runs with appropriate user permissions
- Keep Node.js and dependencies updated
- Monitor logs for security issues
- Consider setting up fail2ban for additional protection
- Regularly backup your application and database