server {
    listen 80;
    server_name event.ekvirafoundation.com www.event.ekvirafoundation.com;

    # === Redirect all HTTP traffic to HTTPS ===
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name event.ekvirafoundation.com www.event.ekvirafoundation.com;

    # === SSL Certificates (Let's Encrypt example) ===
    ssl_certificate /etc/letsencrypt/live/event.ekvirafoundation.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/event.ekvirafoundation.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # === React Frontend ===
    root /var/www/html;
    index index.html;
    client_max_body_size 50M;

    # === Frontend routing (SPA) ===
    location / {
        try_files $uri $uri/ /index.html;
    }

    # === Backend API Reverse Proxy ===
    location /api/v1/ {
        proxy_pass http://127.0.0.1:5000;  # <-- Change port if backend runs elsewhere
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;

        # Optional: timeout and buffer settings for larger responses
        proxy_read_timeout 90;
        proxy_send_timeout 90;
        send_timeout 90;
    }

    # === Security & Performance ===
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # === Logging ===
    access_log /var/log/nginx/event.ekvirafoundation.access.log;
    error_log /var/log/nginx/event.ekvirafoundation.error.log;
}
