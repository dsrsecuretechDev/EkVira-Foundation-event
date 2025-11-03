server {
    listen 80;
    server_name event.ekvirafoundation.com www.event.ekvirafoundation.com;
    # If you use certbot, let it handle ACME challenge; otherwise:
   root /var/www/html;   # path to React build directory
    index index.html;

    # Large uploads support (adjust if you expect bigger files)
    client_max_body_size 50M;

    # Serve React static files; fallback to index.html for SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
}
