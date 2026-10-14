# Personal website of Andrée Barnier

A plain static website: hand-written HTML + CSS + a small vanilla-JS file.
No Hugo, no Node, no frameworks, no CDN dependencies, no build step, no trackers.

## Preview locally

From the repository root:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000> in a browser.

Any static file server works. Opening `index.html` directly also works,
except the `/experience/` URL needs a server (or open
`experience/index.html` directly).

## Deploy

Push to the connected Netlify site (or any static host / GitHub Pages):
`netlify.toml` publishes the repository root with no build command.

---

## Website structure

There are only a few files, and you only ever need to edit two of them:

| File / folder | What it is | Do you need to touch it? |
|---|---|---|
| `index.html` | Homepage: bio, publications, talks | **Yes — this is where new content goes** |
| `experience/index.html` | CV page: education, languages, interests | **Yes, when these change** |
| `uploads/` | `resume.pdf` (Download CV button) and talk poster PDFs | Only to replace/add PDFs |
| `assets/img/me.jpg` | Portrait photo on the homepage | Only to change the photo |
| `assets/css/style.css` | All styling (colors, layout, light/dark mode) | No, unless you want a new look |
| `assets/js/main.js` | Mobile menu, theme toggle, footer year | No — works as-is |
| `404.html` | "Page not found" page | No |
| `netlify.toml` | Tells Netlify "publish this folder, no build" | No |

How the pages link together:

- The top menu has **Bio** (homepage top), **Papers** (homepage `#papers`
  section), **CV** (the `experience/` page), and **Talks** (homepage
  `#talks` section).
- Talks and publications live directly on the homepage — there are no
  separate pages per talk or paper, so everything is updated in one file.

---

## How to add or update content

General workflow for every change below:

1. Open the file in any text editor.
2. Make the change, save the file.
3. Preview with `python3 -m http.server 8000` and open
   <http://localhost:8000>.
4. If it looks good, commit and push to publish.

### Add a new talk

1. Open `index.html` and find the `Recent & Upcoming Talks` section
   (`<h2 id="talks-heading">`).
2. Talks are listed **newest first** — paste the block below as the first
   `<li>` inside the `<ol class="entry-list">` right after that heading.
3. Replace the date, titles, location, and link. Delete the
   `<span class="badge">Upcoming</span>` line for past talks, and delete
   the whole `<details>...</details>` block if the talk has no abstract.

```html
<li>
  <article class="entry" aria-labelledby="talk-myslug">
    <div class="talk-top">
      <time datetime="2026-09-10">Sep 2026</time>
      <h3 id="talk-myslug">Full title of the talk or event</h3>
      <span class="badge">Upcoming</span>
    </div>
    <p class="meta">City, Country · One-line description (e.g. Poster, Invited talk)</p>
    <details class="abstract">
      <summary>Abstract</summary>
      <div><p>Abstract text here.</p></div>
    </details>
    <ul class="entry-links">
      <li><a href="https://event-website.example" rel="noopener">Event website</a></li>
    </ul>
  </article>
</li>
```

Notes:

- `aria-labelledby="talk-myslug"` and the `<h3 id="talk-myslug">` must use
  the same unique id (use the event acronym in lowercase, e.g. `talk-jps`).
- The `datetime="2026-09-10"` value must be a full date in `YYYY-MM-DD`
  format; the visible text (`Sep 2026`) can be anything readable.
- To attach slides or a poster, put the PDF in `uploads/` (e.g.
  `uploads/my-talk-slides.pdf`) and add another link line:
  `<li><a href="uploads/my-talk-slides.pdf">Slides (PDF)</a></li>`

### Add a new publication

1. Open `index.html` and find the `Recent Publications` section
   (`<h2 id="papers-heading">`).
2. Publications are listed **newest first** — paste the block below as the
   first `<li>` inside that `<ol class="entry-list">`.
3. Replace title, authors, date, identifier, abstract, and links. Remove any
   link line you don't need (e.g. no DOI yet).

```html
<li>
  <article class="entry">
    <header>
      <h3>Title of the paper</h3>
      <p class="authors">First Author, Second Author</p>
      <p class="meta">Preprint · <time datetime="2026-03-01">1 March 2026</time> · arXiv:0000.00000</p>
    </header>
    <p>Abstract text here.</p>
    <ul class="entry-links">
      <li><a href="https://arxiv.org/pdf/0000.00000" rel="noopener">PDF</a></li>
      <li><a href="https://doi.org/10.0000/example" rel="noopener">DOI</a></li>
      <li><a href="https://arxiv.org/abs/0000.00000" rel="noopener">arXiv</a></li>
    </ul>
  </article>
</li>
```

### Edit the bio text

Open `index.html`, find the two `<p>...</p>` paragraphs right after the
portrait photo (before the `Download CV` button), and edit the text.
To add a link inside the bio, use:

```html
<a href="https://example.com" rel="noopener">link text</a>
```

### Edit interests

Interests appear in **two places** — keep them in sync:

1. `index.html`: the `<ul class="tag-list">` under the `<h3>Interests</h3>`
   heading near the bio.
2. `experience/index.html`: the `<ul class="tag-list">` under the
   `<h2 id="interests-heading">` heading.

Each interest is one `<li>...</li>` line.

### Edit education

Education appears in **two places**:

1. `index.html`: short version (degree, school, dates only).
2. `experience/index.html`: full version, which may also include a
   description paragraph and a button link.

To add a degree, copy an existing `<li>...</li>` block inside the
`<ul class="edu-list">` in **both files** (with the extra paragraph only
in the CV page if needed). Degrees are listed newest first. Dates use
`<time datetime="2022-10">October 2022</time>` (full month in
`YYYY-MM` format for the `datetime` value).

### Edit languages

On the CV page (`experience/index.html`), find
`<h2 id="languages-heading">`. Each language is one line:

```html
<li><span>French</span> <span class="level">Native</span></li>
```

### Replace the CV (PDF)

Replace the file `uploads/resume.pdf` with the new PDF, keeping the same
file name — the `Download CV` buttons on both pages point to it, so no
HTML change is needed.

### Replace the portrait photo

Replace `assets/img/me.jpg` with the new photo, keeping the same file
name. A square-ish portrait works best; it is displayed cropped to a
circle. Also update the `alt="Portrait of ..."` text on the `<img>` line
in `index.html` if the subject changes.

### Change contact / profile links

On the homepage (`index.html`), find `<ul class="social">`. Each `<li>`
is one pill (Email, LinkedIn, Scholar, ORCID). To change a URL, edit the
`href="..."` value; to remove one, delete its whole `<li>...</li>` block.

### Change colors or fonts

Open `assets/css/style.css` and edit the variables at the top (`--bg`,
`--text`, `--accent`, ...). There are three sets: default (light), dark
mode, and the explicit `data-theme` overrides — change a color in all
three sets to keep light and dark modes consistent.
