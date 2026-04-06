# Hero Section Videos

This folder contains video assets for the Hero section background.

## Required Files

### 1. `hero-background.mp4`

- **Format**: MP4 (H.264 video codec, AAC audio codec)
- **Recommended Resolution**: 1920x1080 or higher
- **Recommended Duration**: 10-30 seconds (should loop seamlessly)
- **File Size**: Keep under 10MB for optimal web performance
- **Aspect Ratio**: 16:9 (landscape)

### 2. `hero-background.webm` (Optional but recommended)

- **Format**: WebM (VP9 video codec, Vorbis audio codec)
- **Recommended Resolution**: 1920x1080 or higher
- **File Size**: Usually 30-40% smaller than MP4
- **Purpose**: Better compression for modern browsers (Chrome, Firefox, Edge)

### 3. `hero-poster.jpg` (Fallback image)

- **Format**: JPEG image
- **Resolution**: 1920x1080 or higher
- **Purpose**: Shows while video is loading
- **File Size**: Keep under 200KB

## How to Convert Videos

### Convert MP4 to WebM (using FFmpeg)

```bash
ffmpeg -i hero-background.mp4 -c:v libvpx-vp9 -b:v 1M -c:a libopus -b:a 128k hero-background.webm
```

### Create a poster image from video

```bash
ffmpeg -i hero-background.mp4 -ss 00:00:00 -vframes 1 hero-poster.jpg
```

## Video Recommendations

- **Best Sources**: Stock video sites like Pexels, Pixabay, Unsplash (for free), or Shutterstock (for premium)
- **Search terms**: "Uganda tourism", "Adventure travel", "Safari", "Nature landscape", "Travel destination"
- **Content ideas**:
  - Aerial footage of Uganda landscapes
  - Safari/wildlife scenes
  - Waterfall or river footage
  - Cultural or local market scenes
  - Sunset/sunrise over landscape

## Implementation Status

✅ **Hero component updated** to load videos from this folder
✅ **CSS optimized** for video backgrounds
✅ **Fallback overlay** (dark gradient) applied for text readability
✅ **Multiple formats** supported (MP4 + WebM for broad compatibility)

## Next Steps

1. Add `hero-background.mp4` to this folder
2. (Optional) Add `hero-background.webm` for better compression
3. Add `hero-poster.jpg` as loading fallback
4. Test in dev server: `npm run dev`
5. Toggle between themes to verify video works on both dark and light modes

## Performance Tips

- Keep video duration under 30 seconds for smaller file sizes
- Use appropriate compression (1-2 Mbps bitrate)
- Test on slow 4G connections to ensure smooth playback
- Consider disabling autoplay on mobile devices if file size is large

---

**Current Status**: Video sources referenced in code but not yet added to this folder. Add the video files above to activate the Hero background! 🎬
