server {
    listen 80;
    server_name event.ekvirafoundation.com www.event.ekvirafoundation.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name event.ekvirafoundation.com www.event.ekvirafoundation.com;

    ssl_certificate /etc/letsencrypt/live/event.ekvirafoundation.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/event.ekvirafoundation.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    root /var/www/html;
    index index.html;
    client_max_body_size 50M;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/v1/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    access_log /var/log/nginx/event.ekvirafoundation.access.log;
    error_log /var/log/nginx/event.ekvirafoundation.error.log;
}
