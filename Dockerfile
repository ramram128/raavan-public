# ========================================================
# Stage 1: Build React 18 Frontend
# ========================================================
FROM node:20-alpine AS frontend
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# ========================================================
# Stage 2: Install Laravel Composer Dependencies
# ========================================================
FROM composer:2 AS vendor
WORKDIR /app/backend

COPY backend/composer*.json backend/composer.lock ./
RUN composer install \
    --no-dev \
    --no-scripts \
    --no-autoloader \
    --prefer-dist

COPY backend/ ./
RUN composer dump-autoload --no-dev --optimize

# ========================================================
# Stage 3: Production PHP 8.3 + Nginx (ServerSideUp)
# ========================================================
FROM serversideup/php:8.3-fpm-nginx-alpine AS production

USER root

# Install required PHP extensions
RUN install-php-extensions pdo_sqlite pdo_mysql pdo_pgsql bcmath gd intl zip opcache

# Configure Render default port
ENV NGINX_HTTP_PORT=10000
ENV PORT=10000
ENV WEBROOT=/var/www/html/public

# Copy custom entrypoint script
COPY docker/99-render-init.sh /etc/entrypoint.d/99-render-init.sh
RUN chmod +r /etc/entrypoint.d/99-render-init.sh

# Copy backend files
COPY --chown=www-data:www-data backend/ /var/www/html

# Copy vendor dependencies from vendor stage
COPY --chown=www-data:www-data --from=vendor /app/backend/vendor /var/www/html/vendor

# Copy compiled frontend assets from frontend stage into Laravel's public directory
COPY --chown=www-data:www-data --from=frontend /app/frontend/dist/ /var/www/html/public/

# Ensure proper storage & cache permissions
RUN mkdir -p /var/www/html/storage/framework/sessions \
             /var/www/html/storage/framework/views \
             /var/www/html/storage/framework/cache \
             /var/www/html/storage/logs \
             /var/www/html/public/uploads \
             /var/www/html/database \
    && touch /var/www/html/database/database.sqlite \
    && chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/database /var/www/html/public \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/database /var/www/html/public

USER www-data

EXPOSE 10000
