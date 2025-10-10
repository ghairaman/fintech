# streamlit_app.py
import re
import base64
from pathlib import Path
import streamlit as st

st.set_page_config(page_title="Index.html in Streamlit", layout="wide")

# --- paths ---
BASE = Path(__file__).parent
HTML_PATH = BASE / "index.html"

st.title("Preview: index.html")

if not HTML_PATH.exists():
    st.error("index.html not found next to streamlit_app.py")
    st.stop()

html = HTML_PATH.read_text(encoding="utf-8", errors="ignore")

# -------- Optional: inline local assets so the page works inside the iframe --------
# This helps when your index.html references files like ./style.css, ./script.js, ./images/pic.png

def inline_css_js_images(html_text: str, base_dir: Path) -> str:
    out = html_text

    # Inline <link rel="stylesheet" href="...">
    def repl_css(m):
        href = m.group(1)
        p = (base_dir / href).resolve()
        if not p.exists() or p.is_dir():
            return m.group(0)
        try:
            css = p.read_text(encoding="utf-8", errors="ignore")
            return f"<style>\n{css}\n</style>"
        except Exception:
            return m.group(0)

    out = re.sub(r'<link[^>]+rel=["\']stylesheet["\'][^>]+href=["\']([^"\']+)["\'][^>]*>',
                 repl_css, out, flags=re.IGNORECASE)

    # Inline <script src="..."></script>
    def repl_js(m):
        src = m.group(1)
        # Skip absolute URLs (http/https)
        if re.match(r'^(https?:)?//', src, flags=re.I):
            return m.group(0)
        p = (base_dir / src).resolve()
        if not p.exists() or p.is_dir():
            return m.group(0)
        try:
            js = p.read_text(encoding="utf-8", errors="ignore")
            return f"<script>\n{js}\n</script>"
        except Exception:
            return m.group(0)

    out = re.sub(r'<script[^>]+src=["\']([^"\']+)["\'][^>]*>\s*</script>',
                 repl_js, out, flags=re.IGNORECASE)

    # Inline images <img src="..."> as data URIs for common formats
    def repl_img(m):
        src = m.group(1)
        # leave absolute URLs alone
        if re.match(r'^(https?:)?//', src, flags=re.I):
            return m.group(0)
        p = (base_dir / src).resolve()
        if not p.exists() or p.is_dir():
            return m.group(0)
        ext = p.suffix.lower().lstrip(".")
        mime = {
            "png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg",
            "gif": "image/gif", "svg": "image/svg+xml", "webp": "image/webp"
        }.get(ext)
        if not mime:
            return m.group(0)
        try:
            if ext == "svg":
                data = p.read_text(encoding="utf-8", errors="ignore")
                b64 = base64.b64encode(data.encode("utf-8")).decode("ascii")
            else:
                b64 = base64.b64encode(p.read_bytes()).decode("ascii")
            return m.group(0).replace(src, f"data:{mime};base64,{b64}")
        except Exception:
            return m.group(0)

    out = re.sub(r'<img([^>]+)src=["\']([^"\']+)["\']', lambda m: m.group(0).replace(m.group(2), repl_img(m) if False else m.group(2)), out)
    # The above one-liner is messy; do a second pass for clarity:
    out = re.sub(r'(<img[^>]+src=["\'])([^"\']+)(["\'])', 
                 lambda m: f"{m.group(1)}{repl_img(m)[len('<img')+1:] if False else ( (lambda src: ( (lambda p: (m.group(1) + (lambda rep: rep if rep else src)( (lambda: (lambda pth: (lambda mime: (lambda rep: rep if rep else src)( (lambda: (lambda data_uri: data_uri if data_uri else src)( None )) ) )('') )(p) ) )() ) )(src) )(m.group(2)) ) }", 
                 out)

    # Simpler and reliable image replacement (clean version):
    def img_simple_replacer(m):
        prefix, src, suffix = m.groups()
        # keep absolute URLs
        if re.match(r'^(https?:)?//', src, flags=re.I):
            return m.group(0)
        p = (base_dir / src).resolve()
        if not p.exists() or p.is_dir():
            return m.group(0)
        ext = p.suffix.lower().lstrip(".")
        mime = {
            "png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg",
            "gif": "image/gif", "svg": "image/svg+xml", "webp": "image/webp"
        }.get(ext)
        if not mime:
            return m.group(0)
        try:
            if ext == "svg":
                data = p.read_text(encoding="utf-8", errors="ignore")
                b64 = base64.b64encode(data.encode("utf-8")).decode("ascii")
            else:
                b64 = base64.b64encode(p.read_bytes()).decode("ascii")
            return f'{prefix}data:{mime};base64,{b64}{suffix}'
        except Exception:
            return m.group(0)

    out = re.sub(r'(<img[^>]+src=["\'])([^"\']+)(["\'])', img_simple_replacer, out)

    return out

with st.expander("Inline local CSS/JS/images (recommended if your HTML uses relative files)", expanded=True):
    do_inline = st.checkbox("Inline local assets", value=True)
    if do_inline:
        html = inline_css_js_images(html, HTML_PATH.parent)

# Height and render
height = st.slider("Preview height (px)", 500, 2000, 900, 50)
scrolling = st.toggle("Enable scrolling in preview", value=True)

st.components.v1.html(html, height=height, scrolling=scrolling)
