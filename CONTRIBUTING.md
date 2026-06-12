# Contributing

## Branching Strategy

- `main` is the protected primary branch.
- Do not push directly to `main`.
- Create feature branches from `main`.
- Feature branches should use the format `feature/<short-name>`.

Examples:

```text
feature/initialize-frontend
feature/backend-foundation
feature/odisha-sample-data
```

## Commit Message Style

Use short, clear commit messages in the imperative mood.

Examples:

```text
Create repository foundation
Add frontend project structure
Document MVP architecture
```

## Pull Request Rules

- Open a pull request for every change before merging into `main`.
- Keep pull requests focused on one feature, fix, or task.
- Include a short summary of what changed.
- Include testing notes when code or configuration changes are introduced.
- Do not include unrelated formatting or cleanup in feature pull requests.

## Main Branch Protection

No direct push to `main`. All work should go through pull requests from feature branches.
