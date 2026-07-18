#!/usr/bin/env bash
# Guard: block franchise-derived terms from entering this public repository.
# Modes:
#   (default)   scan tracked files in the working tree
#   --staged    scan content staged for commit (used by the pre-commit hook)
#   --history   scan full git history (diffs and commit messages)
set -euo pipefail

PATTERN='(^|[^[:alpha:]])(ender|dragon|salamander|eros|formic|wiggin|graff|mazer|rackham|bonzo|battle[ _-]?school)'
# Guard files legitimately contain the pattern itself.
EXCLUDE=(':!scripts/check-ip.sh' ':!.githooks/pre-commit')

fail() {
  echo ""
  echo "ERROR: franchise-derived term detected. This repository must stay IP-clean." >&2
  echo "Remove the term above (see dev docs in the private parent repo for context)." >&2
  exit 1
}

case "${1:-}" in
  --staged)
    hits=0
    while IFS= read -r f; do
      case "$f" in
        scripts/check-ip.sh|.githooks/pre-commit) continue ;;
      esac
      if git show ":$f" 2>/dev/null | grep -inE "$PATTERN" | sed "s|^|$f:|"; then
        hits=1
      fi
    done < <(git diff --cached --name-only --diff-filter=ACM)
    [ "$hits" -eq 0 ] || fail
    ;;
  --history)
    if git log -p --all -- . "${EXCLUDE[@]}" | grep -inE "$PATTERN"; then fail; fi
    if git log --all --format=%B | grep -inE "$PATTERN"; then fail; fi
    ;;
  *)
    if git grep -inE --untracked "$PATTERN" -- . "${EXCLUDE[@]}"; then fail; fi
    ;;
esac

echo "IP check passed (${1:-worktree})."
