from datetime import UTC, datetime
from enum import StrEnum
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="CoAgent API", version="0.2.0")


class RunStatus(StrEnum):
    PENDING_APPROVAL = "pending_approval"
    APPROVED = "approved"
    RUNNING = "running"
    COMPLETED = "completed"
    CANCELED = "canceled"


class RunCreateRequest(BaseModel):
    agent_name: str = Field(min_length=1, max_length=120)
    goal: str = Field(min_length=1, max_length=1000)


class RunResponse(BaseModel):
    id: str
    agent_name: str
    goal: str
    status: RunStatus
    created_at: str
    updated_at: str


class RunActionResponse(BaseModel):
    id: str
    status: RunStatus
    updated_at: str
    message: str


class RunListResponse(BaseModel):
    items: list[RunResponse]
    count: int


MOCK_RUNS: dict[str, RunResponse] = {}


def now_iso() -> str:
    return datetime.now(UTC).isoformat()


def get_run_or_404(run_id: str) -> RunResponse:
    run = MOCK_RUNS.get(run_id)
    if not run:
        raise HTTPException(status_code=404, detail=f"Run '{run_id}' not found")
    return run


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/version")
def version() -> dict[str, str]:
    return {"name": "coagent-api", "version": "0.2.0"}


@app.get("/runs", response_model=RunListResponse)
def list_runs(status: RunStatus | None = None) -> RunListResponse:
    runs = list(MOCK_RUNS.values())
    if status is not None:
        runs = [run for run in runs if run.status == status]
    runs.sort(key=lambda item: item.created_at, reverse=True)
    return RunListResponse(items=runs, count=len(runs))


@app.post("/runs", response_model=RunResponse)
def create_run(payload: RunCreateRequest) -> RunResponse:
    run_id = f"run_{len(MOCK_RUNS) + 1:04d}"
    timestamp = now_iso()
    run = RunResponse(
        id=run_id,
        agent_name=payload.agent_name,
        goal=payload.goal,
        status=RunStatus.PENDING_APPROVAL,
        created_at=timestamp,
        updated_at=timestamp,
    )
    MOCK_RUNS[run.id] = run
    return run


@app.post("/runs/{run_id}/approve", response_model=RunActionResponse)
def approve_run(run_id: str) -> RunActionResponse:
    run = get_run_or_404(run_id)
    if run.status != RunStatus.PENDING_APPROVAL:
        raise HTTPException(
            status_code=409,
            detail=f"Only '{RunStatus.PENDING_APPROVAL}' runs can be approved",
        )

    run.status = RunStatus.APPROVED
    run.updated_at = now_iso()

    return RunActionResponse(
        id=run.id,
        status=run.status,
        updated_at=run.updated_at,
        message="Run approved and ready for execution",
    )


@app.post("/runs/{run_id}/cancel", response_model=RunActionResponse)
def cancel_run(run_id: str) -> RunActionResponse:
    run = get_run_or_404(run_id)
    if run.status in {RunStatus.COMPLETED, RunStatus.CANCELED}:
        raise HTTPException(
            status_code=409,
            detail="Completed or already canceled runs cannot be canceled",
        )

    run.status = RunStatus.CANCELED
    run.updated_at = now_iso()

    return RunActionResponse(
        id=run.id,
        status=run.status,
        updated_at=run.updated_at,
        message="Run canceled",
    )


@app.post("/runs/{run_id}/simulate-complete", response_model=RunActionResponse)
def complete_run_for_demo(run_id: str) -> RunActionResponse:
    run = get_run_or_404(run_id)
    if run.status not in {RunStatus.APPROVED, RunStatus.RUNNING}:
        raise HTTPException(
            status_code=409,
            detail="Only approved/running runs can be completed",
        )

    run.status = RunStatus.COMPLETED
    run.updated_at = now_iso()

    return RunActionResponse(
        id=run.id,
        status=run.status,
        updated_at=run.updated_at,
        message="Run marked as completed",
    )
