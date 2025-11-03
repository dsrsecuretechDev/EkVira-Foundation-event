server {
    listen 80;
    server_name event.ekvirafoundation.com www.event.ekvirafoundation.com;

    # Path to React build directory
    root /var/www/html;
    index index.html;

    # Allow large uploads (adjust if needed)
    client_max_body_size 50M;

    # Serve React static files; fallback to index.html for SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
