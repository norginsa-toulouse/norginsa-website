#!/usr/bin/env python3
"""Lokal forhåndsvisning med de samme adressene som i produksjon.

    python3 serve.py          # http://localhost:8000

Lenkene på nettstedet peker på «/about» og «/arkiv/kart/kart», uten .html.
Cloudflare Pages finner fila selv; en vanlig statisk server gjør det ikke, og
da får du 404 lokalt på lenker som virker i produksjon. Denne serveren gjør
det samme oppslaget som Cloudflare: prøver stien, så stien + .html, så
stien/index.html.
"""
import http.server, os, socketserver, sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8000


class Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        full = super().translate_path(path)
        if os.path.isdir(full):
            if os.path.exists(os.path.join(full, "index.html")):
                return os.path.join(full, "index.html")
        elif not os.path.exists(full) and os.path.exists(full + ".html"):
            return full + ".html"
        return full

    def log_message(self, fmt, *args):
        sys.stderr.write("  %s\n" % (fmt % args))


if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), Handler) as s:
        print(f"NORGINSA på http://localhost:{PORT}  (Ctrl+C for å stoppe)")
        try:
            s.serve_forever()
        except KeyboardInterrupt:
            print("\nstoppet")
