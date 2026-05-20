# CoAgent

CoAgent is an agent-operations platform for building AI teammates that can run reliable business workflows across tools (email, chat, CRM, docs, and APIs).

## 2-Day Build Sprint (MVP Foundation)

This repository now includes a practical starter architecture so we can move fast over the next 48 hours.

### Day 1 — Core runtime + API

- [ ] Define domain models (`Agent`, `Run`, `Tool`, `KnowledgeSource`, `ApprovalTask`)
- [ ] Build backend API skeleton (FastAPI)
- [ ] Add health + version endpoints
- [ ] Add run lifecycle endpoint stubs (`create run`, `approve run`, `cancel run`)
- [ ] Add queue + worker abstraction
- [ ] Add local docker-compose stack (Postgres + Redis)

### Day 2 — Usable product shell

- [ ] Build web app shell (Next.js + TypeScript)
- [ ] Add "Create Agent" form (name, goal, tools, approval mode)
- [ ] Add "Runs" table UI connected to backend
- [ ] Add event logging schema + basic observability panel
- [ ] Add one starter template: "Lead Research Agent"

## Project Layout

```
coagent/
  apps/
    api/        # FastAPI backend
    web/        # Next.js frontend
  packages/
    shared/     # shared contracts/types
  infra/
    docker-compose.yml
```

## Quick Start

### 1) Start infrastructure

```bash
docker compose -f infra/docker-compose.yml up -d
```

### 2) Backend

```bash
cd apps/api
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 3) Frontend

```bash
cd apps/web
npm install
npm run dev
```

## API Endpoints (initial)

- `GET /health` — service health
- `GET /version` — api version metadata
- `GET /runs` — list mock runs
- `POST /runs` — create a mock run

## Next Priorities

1. Real persistence (Postgres + SQLAlchemy)
2. Auth + multi-tenant workspace model
3. Tool adapters (Slack, Gmail, HubSpot)
4. Human approval gates in run execution path
5. Trace + cost observability for each agent run
