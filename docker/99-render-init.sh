#!/bin/sh
echo "=> [Raavan Studio'z] Initializing Render environment..."

# Ensure required runtime directories exist
mkdir -p /var/www/html/storage/framework/sessions \
         /var/www/html/storage/framework/views \
         /var/www/html/storage/framework/cache \
         /var/www/html/storage/logs \
         /var/www/html/public/uploads \
         /var/www/html/database

# Ensure SQLite file exists if using SQLite database
if [ "${DB_CONNECTION:-sqlite}" = "sqlite" ]; then
    if [ ! -f /var/www/html/database/database.sqlite ]; then
        touch /var/www/html/database/database.sqlite
    fi
    chmod 664 /var/www/html/database/database.sqlite
fi

# Run database migrations
php artisan migrate --force --graceful

# Seed default data if database is fresh
php artisan db:seed --force || true

# Ensure storage symlink exists
php artisan storage:link || true

echo "=> [Raavan Studio'z] Initialization complete. Starting web service on port ${NGINX_HTTP_PORT:-10000}..."
