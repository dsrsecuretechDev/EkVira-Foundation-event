server {
    listen 80;
    server_name event.ekvirafoundation.com www.event.ekvirafoundation.com;

    root /var/www/event.ekvirafoundation.com;
    index index.html;

    client_max_body_size 50M;

    location / {
        try_files $uri $uri/ /index.html;
    }
}