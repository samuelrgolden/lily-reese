#!/usr/bin/env python3
"""
Compress images to web-ready WebP for a portfolio site.

Handles the two jobs that came up on every build:
  1. Plain resize+compress to a width/size budget (photos, thumbnails).
  2. Cropping a photo OUT of a full-page article scan (issuu/Wix export)
     so the card shows the image, not a wall of tiny body text.

Requires Pillow:  pip install Pillow   (or: python3 -m pip install Pillow)

Examples
--------
# One file -> WebP, max 1600px wide, under 400 KB (portraits/hero photos)
python3 to_webp.py in.jpg out.webp --width 1600 --max-kb 400

# Straight from an image URL (an article's lead photo) -> a work thumbnail
python3 to_webp.py https://example.com/photo.jpg public/work/slug.webp --width 1200 --max-kb 250

# A whole folder of downloaded article thumbnails -> a target dir
python3 to_webp.py ./downloads/ ./public/work/ --width 1200 --max-kb 250

# Crop the photo out of a full-page magazine scan (pixels: left top right bottom)
python3 to_webp.py page150.jpg press-box.webp --crop 44 810 1374 1460

# Auto-trim white page margins before compressing (magazine cover pages)
python3 to_webp.py cover.jpg cover.webp --trim-white --width 1000

Notes
-----
- Quality steps down from 84 until the file fits --max-kb (floor 50), so you
  get the smallest visible-quality hit that still meets the budget.
- ImageOps.exif_transpose fixes phone photos that render sideways.
- WebP keeps transparency and compresses far better than JPEG at these sizes.
"""
import argparse
import os
import sys
import tempfile
import urllib.request

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("Pillow is required.  Install it with:  python3 -m pip install Pillow")


def trim_white(im, thresh=242):
    """Crop away near-white borders (common on scanned/exported magazine pages)."""
    gray = im.convert("L").point(lambda p: 0 if p >= thresh else 255)
    bbox = gray.getbbox()
    return im.crop(bbox) if bbox else im


def to_webp(im, dst, width, max_kb):
    im = ImageOps.exif_transpose(im).convert("RGB")
    if width and im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    q = 84
    while True:
        im.save(dst, "WEBP", quality=q, method=6)
        kb = os.path.getsize(dst) / 1024
        if kb <= max_kb or q <= 50:
            break
        q -= 4
    print(f"{os.path.basename(dst):32s} {im.size[0]}x{im.size[1]}  {kb:6.0f} KB  q={q}")


def fetch(url):
    """Download an image URL to a temp file. News sites refuse the default
    urllib user agent, so send a browser-like one."""
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        tmp = tempfile.NamedTemporaryFile(delete=False)
        tmp.write(resp.read())
        tmp.close()
    return tmp.name


def process(src, dst, args):
    if src.startswith(("http://", "https://")):
        src = fetch(src)
    im = Image.open(src)
    if args.crop:
        im = ImageOps.exif_transpose(im).crop(tuple(args.crop))
    if args.trim_white:
        im = trim_white(ImageOps.exif_transpose(im).convert("RGB"))
    to_webp(im, dst, args.width, args.max_kb)


def main():
    ap = argparse.ArgumentParser(description="Compress images to web-ready WebP.")
    ap.add_argument("src", help="Source image file or URL, or a folder of images.")
    ap.add_argument("dst", help="Output .webp file, or a target folder if src is a folder.")
    ap.add_argument("--width", type=int, default=1600, help="Max width in px (default 1600).")
    ap.add_argument("--max-kb", type=int, default=400, help="Target max file size in KB (default 400).")
    ap.add_argument("--crop", type=int, nargs=4, metavar=("L", "T", "R", "B"),
                    help="Crop box in source pixels before compressing (single-file only).")
    ap.add_argument("--trim-white", action="store_true", help="Auto-trim near-white margins first.")
    args = ap.parse_args()

    exts = (".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG")
    if os.path.isdir(args.src):
        os.makedirs(args.dst, exist_ok=True)
        for name in sorted(os.listdir(args.src)):
            if name.endswith(exts):
                stem = os.path.splitext(name)[0]
                process(os.path.join(args.src, name), os.path.join(args.dst, stem + ".webp"), args)
    else:
        process(args.src, args.dst, args)


if __name__ == "__main__":
    main()
