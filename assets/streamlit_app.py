# streamlit_app.py
import re
import base64
from pathlib import Path
import streamlit as st

st.set_page_config(page_title="Index.html in Streamlit", layout="wide")

BASE = Path(__file__).parent
HTML_PATH = BASE / "index.html"

st.title("Preview: index.html")

if not HTML_PATH.exists():
    st.error("index.html not found next to streamlit_app.py")
    st.stop()

html = HTML_PATH.read_text(encoding="utf-8", errors="ignore")

def inline_local_assets(html_text: str, base_dir: Path) -> str:
    """
    Inlines local CSS <link>, local <script src>, and <img src> as data URIs.
    Leaves absolute URLs (http/https) untouched.
    """
    out = html_text

    # --- Inline CSS <link rel="stylesheet" href="..."> ---
    def css_replacer(m):
        href = m.group(1).strip()
        # keep absolute URLs
        if re.match(r'^(https?:)?//', href, flags=re.I):
            return m.group(0)
        p = (base_dir / href).resolve()
        if not p.exists() or p.is_dir():
            return m.group(0)
        try:
            css = p.read_text(encoding="utf-8", errors="ignore")
            return f"<style>\n{css}\n</style>"
        except Exception:
            return m.group(0)

    out = re.sub(
        r'<link[^>]*rel=["\']stylesheet["\'][^>]*href=["\']([^"\']+)["\'][^>]*>',
        css_replacer,
        out,
        flags=re.IGNORECASE
    )

    # --- Inline JS <script src="..."></script> ---
    def js_replacer(m):
        src = m.group(1).strip()
        # keep absolute URLs
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

    out = re.sub(
        r'<script[^>]*src=["\']([^"\']+)["\'][^>]*>\s*</script>',
        js_replacer,
        out,
        flags=re.IGNORECASE
    )

    # --- Inline images <img src="..."> as data URIs ---
    def img_replacer(m):
        prefix, src, suffix = m.groups()
        src = src.strip()

        # leave absolute or already inlined data URIs alone
        if re.match(r'^(https?:)?//', src, flags=re.I) or src.startswith("data:"):
            return m.group(0)

        p = (base_dir / src).resolve()
        if not p.exists() or p.is_dir():
            return m.group(0)

        ext = p.suffix.lower().lstrip(".")
        mime = {
            "png": "image/png",
            "jpg": "image/jpeg",
            "jpeg": "image/jpeg",
            "gif": "image/gif",
            "svg": "image/svg+xml",
            "webp": "image/webp",
        }.get(ext)
        if not mime:
            return m.group(0)

        try:
            if ext == "svg":
                data = p.read_text(encoding="utf-8", errors="ignore").encode("utf-8")
            else:
                data = p.read_bytes()
            b64 = base64.b64encode(data).decode("ascii")
            return f'{prefix}data:{mime};base64,{b64}{suffix}'
        except Exception:
            return m.group(0)

    out = re.sub(
        r'(<img[^>]+src=["\'])([^"\']+)(["\'])',
        img_replacer,
        out,
        flags=re.IGNORECASE
    )

    return out

with st.expander("Inline local CSS/JS/images (recommended if your HTML uses relative files)", expanded=True):
    do_inline = st.checkbox("Inline local assets", value=True)
    if do_inline:
        html = inline_local_assets(html, HTML_PATH.parent)

height = st.slider("Preview height (px)", 500, 2000, 900, 50)
scrolling = st.toggle("Enable scrolling in preview", value=True)

st.components.v1.html(html, height=height, scrolling=scrolling)
