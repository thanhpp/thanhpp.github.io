# thanhpp.github.io

Personal GitHub Page built with [Hugo](https://gohugo.io/). No theme — custom layouts only.

## Local development

Install Hugo (extended edition required):

```bash
go install github.com/gohugoio/hugo@latest
```

Serve locally:

```bash
hugo server
```

Open `http://localhost:1313`.

## CI / GitHub Pages setup

Deployment is automated via GitHub Actions on every push to `master`.

### 1. Enable GitHub Pages

In the repository settings:

1. Go to **Settings → Pages**.
2. Set **Source** to `Deploy from a branch`.
3. Set **Branch** to `gh-pages`, folder `/` (root).
4. Save.

### 2. Allow Actions to write to the repository

In the repository settings:

1. Go to **Settings → Actions → General**.
2. Under **Workflow permissions**, select **Read and write permissions**.
3. Save.

### 3. Deploy

Push to `master`. The workflow (`.github/workflows/deploy.yaml`) will:

1. Build the site with `hugo --minify`.
2. Push the `public/` output to the `gh-pages` branch.

GitHub Pages then serves the site from `gh-pages`.

## Content

| File                    | Purpose                                                  |
| ----------------------- | -------------------------------------------------------- |
| `hugo.yaml`             | Site config and intro section (name, role, avatar, link) |
| `data/main_quests.yaml` | Main quest cards                                         |
| `data/side_quests.yaml` | Side quest items (progress auto-computed from checklist) |

### Adding a link to a quest

Set the `link` field in the YAML data:

```yaml
- title: "My Project"
  link: "https://github.com/thanhpp/my-project"
  ...
```

### Using an image avatar

Set `params.intro.avatar` in `hugo.yaml` to an image URL:

```yaml
params:
  intro:
    avatar: "https://avatars.githubusercontent.com/u/your-id"
```
